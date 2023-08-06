// import react, { useState, useEffect, useRef, MutableRefObject } from 'react';

// type ExportType = {
//   ws: MutableRefObject<WebSocket | null>,
//   contents: {}
// }
// export const useWebSocket = (
//   gameId: string
// ): react.MutableRefObject<WebSocket | null> => {
//   const [contents, setContents] = useState({});
//   const ws = useRef(null) as MutableRefObject<WebSocket | null>;

//   useEffect(() => {
//     // you would abstract this out to the js file
//     // and set the ref to the js files functions
//     // the .onmessage would still stay here though.
//     // just connection would be abstracted
//     ws.current = new WebSocket('ws://localhost:3000');
//     ws.current.onopen = () => console.log('ws opened');
//     ws.current.onclose = () => console.log('ws closed');

//     const wsCurrent = ws.current;

//     ws.current.onmessage = e => {
//       const message = JSON.parse(e.data);
//       setContents(message);
//       console.log('ws message:', message);
//     };

//     return () => {
//       wsCurrent.close();
//     };
//   }, []);

//   return {
//     ws,
//     contents
//   };
// };

// import { useEffect, useState } from 'react';

// const useWebSocket = (url: string) => {
//   const [socket, setSocket] = useState<WebSocket | null>(null);
//   const [messages, setMessages] = useState<string[]>([]);

//   useEffect(() => {
//     const newSocket = new WebSocket(url);

//     newSocket.onopen = () => {
//       console.log('WebSocket connection established.');
//     };

//     newSocket.onmessage = event => {
//       const receivedMessage = event.data;
//       setMessages(prevMessages => [...prevMessages, receivedMessage]);
//     };

//     newSocket.onclose = () => {
//       console.log('WebSocket connection closed.');
//     };

//     setSocket(newSocket);

//     return () => {
//       // Close the WebSocket connection when the component unmounts
//       if (newSocket && newSocket.readyState === WebSocket.OPEN) {
//         newSocket.close();
//       }
//     };
//   }, [url]);

//   const sendMessage = (message: string) => {
//     if (socket && socket.readyState === WebSocket.OPEN) {
//       socket.send(message);
//     } else {
//       console.log('WebSocket connection is not open. Message not sent.');
//     }
//   };

//   return { messages, sendMessage };
// };

// export default useWebSocket;

import {
  useState,
  useEffect,
  useRef,
  useCallback,
  MutableRefObject,
  ElementRef
} from 'react';

type WebSocketHook = {
  sendMessage: (message: string) => void;
  receivedMessages: string[];
  webSocketRef: MutableRefObject<WebSocket | null>;
};

const useWebSocket = (url: string): WebSocketHook => {
  const webSocketRef = useRef<WebSocket | null>(null);
  const [receivedMessages, setReceivedMessages] = useState<string[]>([]);
  console.log('reveivedMessages', receivedMessages);

  const handleMessage = (event: MessageEvent) => {
    const { data } = event;
    // console.log('data1', data);
    let dataObj;
    try {
      dataObj = JSON.parse(data);
    } catch (e) {}

    console.log('data1', dataObj);

    if (dataObj?.contentType) {
      console.log('data', data);
    }
    setReceivedMessages(prevMessages => [...prevMessages, data]);
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
    receivedMessages,
    webSocketRef
  };
};

export default useWebSocket;
