import React from 'react';
import Message from '../Message/Message';
import useWebSocket from '../../Hooks/useWebSocket';
import { VStack } from '@chakra-ui/react';

const MessageContainer: React.FC = () => {
  const { receivedMessages } = useWebSocket();
  return (
    <VStack
      data-testid={'message-container-test'}
      justify="flex-start"
      fontSize="md"
      height="100%"
      overflowY="scroll"
    >
      {receivedMessages.map((obj, i) => {
        return (
          <Message
            key={`message-${i}`}
            time={obj.time}
            name={obj.name}
            content={obj.content}
          />
        );
      })}
    </VStack>
  );
};

export default MessageContainer;
