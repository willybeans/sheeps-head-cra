import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { MessageBody } from '../../types';

type WebSocketHook = {
  sendMessage: (message: MessageBody) => void;
  receivedMessages: MessageBody[];
  receivedGameMoves: string[];
  webSocketRef: MutableRefObject<WebSocket | null>;
};

const useWebSocket = (url?: string): WebSocketHook => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<MessageBody[]>([]);
  const [receivedGameMoves, setReceivedGameMoves] = useState<string[]>([]);

  const handleMessage = (event: MessageEvent) => {
    const { data } = event;
    let dataObj;
    try {
      dataObj = JSON.parse(data);
    } catch (e) {}

    if (dataObj?.contentType === 'chat') {
      setReceivedMessages(prevMessages => [...prevMessages, data]);
    } else if (dataObj?.contentType === 'game') {
      setReceivedGameMoves(prevMoves => [...prevMoves, data]);
    }
  };

  const connectWebSocket = () => {
    if (url) {
      webSocketRef.current = new WebSocket(url);
      webSocketRef.current.onmessage = handleMessage;
    }
  };

  const disconnectWebSocket = () => {
    if (webSocketRef?.current?.readyState === 1) {
      webSocketRef.current.close();
      webSocketRef.current = null;
    }
  };

  const sendMessage = (message: MessageBody) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      try {
        const stringedMessage = JSON.stringify(message);
        webSocketRef.current.send(stringedMessage);
      } catch (e) {}
    }
  };

  useEffect(() => {
    if (url !== '') {
      connectWebSocket();
    }
    //placeholder for dev
    setReceivedMessages(prev => [
      ...prev,
      {
        time: '123',
        name: 'name1',
        content: 'content1 content1 content1 content1'
      },
      {
        time: '234',
        name: 'name2',
        content: 'content2'
      },
      {
        time: '345',
        name: 'name1',
        content: 'content3'
      },
      {
        time: '456',
        name: 'name2',
        content: 'content4'
      }
    ]);
    return () => {
      disconnectWebSocket();
    };
  }, [url]);

  return {
    sendMessage,
    receivedGameMoves,
    receivedMessages,
    webSocketRef
  };
};

export default useWebSocket;
