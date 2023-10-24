import React from 'react';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputBox from '../InputBox/InputBox';
import { Flex } from '@chakra-ui/react';
import { ChatFeed, WebSocketSend } from '../../../types';
import { useColorMode } from '@chakra-ui/react';

const ChatContainer: React.FC<{
  send: WebSocketSend | undefined;
  chatFeed: ChatFeed;
  userId?: string;
  userName?: string;
}> = ({ send, chatFeed, userId }) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
      bg={colorMode === 'light' ? 'purple.100' : 'purple.900'}
      direction={'column'}
      justify={'space-between'}
      data-testid={'chat-container-test'}
      height="90%"
      borderRadius="md"
      padding=".25em"
    >
      <MessageContainer chatFeed={chatFeed} />
      <InputBox userId={userId} send={send} />
    </Flex>
  );
};

export default ChatContainer;
