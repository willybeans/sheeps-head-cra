import React from 'react';
import Message from '../Message/Message';
import { VStack } from '@chakra-ui/react';
import { ChatFeed } from '../../../types';

const MessageContainer: React.FC<{ chatFeed: ChatFeed }> = props => {
  return (
    <VStack
      data-testid={'message-container-test'}
      justify="flex-end"
      fontSize="md"
      height="100%"
      overflowY="scroll"
    >
      {props.chatFeed.map((obj, i) => {
        const convertTime = new Date(obj.time).toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
        return (
          <Message
            key={`message-${i}`}
            time={convertTime}
            name={obj.name}
            content={obj.content}
          />
        );
      })}
    </VStack>
  );
};

export default MessageContainer;
