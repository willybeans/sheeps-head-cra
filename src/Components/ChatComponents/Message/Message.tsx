import React from 'react';
import { MessageBody } from '../../../types';
import { Flex, Text, chakra } from '@chakra-ui/react';

const Message: React.FC<MessageBody> = ({ name, content, time }) => {
  return (
    <Flex
      direction={'row'}
      data-testid={'message-test'}
      justify={'flex-start'}
      width="100%"
    >
      <Text align="left">
        <chakra.span fontWeight="extrabold" color="gray.400">
          [{time}]
        </chakra.span>
        <chakra.span fontWeight="extrabold">{name} : </chakra.span>
        {content}
      </Text>
    </Flex>
  );
};

export default Message;
