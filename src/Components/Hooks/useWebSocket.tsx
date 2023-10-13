import { useState, useEffect, useRef } from 'react';
import {
  MessageBody,
  ApiMessage,
  WebSocketSend,
  GameInstance
} from '../../types';

type WebSocketHook = [
  isReady: boolean,
  receivedMessages: MessageBody[],
  gameState: GameInstance,
  send: WebSocketSend | undefined
];

const useWebSocket = (url?: string): WebSocketHook => {
  const urlRef = useRef<string | null>(null);
  const webSocketRef = useRef<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<MessageBody[]>([]);
  const [gameState, setGameState] = useState<GameInstance>({} as GameInstance);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    if (url && urlRef.current !== url && webSocketRef.current === null) {
      const ws = new WebSocket(url);
      ws.onopen = e => {
        setIsReady(true);
      };
      ws.onclose = () => setIsReady(false);
      ws.onmessage = event => {
        const { data } = event;

        let parsed = {} as ApiMessage;
        try {
          parsed = JSON.parse(data);
          if (parsed.contentType === 'chat') {
            setReceivedMessages(prev => [
              ...prev,
              {
                name: parsed.user_name,
                time: parsed.sent_at,
                content: parsed.content
              }
            ]);
          } else if (parsed.contentType === 'game') {
            console.log('parsed', parsed);
            setGameState({ ...(parsed.gameInstance as GameInstance) });
          }
        } catch (e) {
          console.error(e);
        }
      };

      webSocketRef.current = ws;
      urlRef.current = url;
      return () => {
        if (ws.readyState === 1) {
          // <-- This is important
          ws.close();
        }
      };
    }
  }, [url]);

  return [
    isReady,
    receivedMessages,
    gameState,
    webSocketRef.current?.send.bind(webSocketRef.current)
  ];
};

export default useWebSocket;
