import { useState, useEffect, useRef, MutableRefObject } from 'react';

type WebSocketHook = {
  sendMessage: (message: string) => void;
  receivedMessages: string[];
  receivedGameMoves: string[];
  webSocketRef: MutableRefObject<WebSocket | null>;
};

const useWebSocket = (url: string): WebSocketHook => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
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
    webSocketRef.current = new WebSocket(url);
    webSocketRef.current.onmessage = handleMessage;
  };

  const disconnectWebSocket = () => {
    if (webSocketRef?.current?.readyState === 1) {
      webSocketRef.current.close();
      webSocketRef.current = null;
    }
  };

  const sendMessage = (message: string) => {
    if (
      webSocketRef.current &&
      webSocketRef.current.readyState === WebSocket.OPEN
    ) {
      webSocketRef.current.send(message);
    }
  };

  useEffect(() => {
    if (url !== '') {
      connectWebSocket();
    }
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
