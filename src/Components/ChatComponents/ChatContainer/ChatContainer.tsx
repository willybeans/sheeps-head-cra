import React from 'react';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputBox from '../InputBox/InputBox';
import { Flex } from '@chakra-ui/react';

const ChatContainer: React.FC = () => {
  return (
    <Flex
      bg={'purple.900'}
      direction={'column'}
      justify={'space-between'}
      data-testid={'chat-container-test'}
      height="90%"
      borderRadius="md"
      padding=".25em"
    >
      <MessageContainer />
      <InputBox />
    </Flex>
  );
};

export default ChatContainer;
