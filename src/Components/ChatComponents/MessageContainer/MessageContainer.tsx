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
