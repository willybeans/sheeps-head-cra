import React, { useState } from 'react';
import useWebSocket from '../../Hooks/useWebSocket';
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton
} from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';

const InputBox: React.FC = () => {
  const { sendMessage } = useWebSocket();
  const [userInput, setUserInput] = useState('');
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const onSubmit = () => {
    const d = new Date();
    sendMessage({
      time: d.getTime.toString(),
      name: 'placeholder', // need to pass user val
      content: userInput
    });
    setUserInput('');
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <InputGroup size={'md'}>
      <Input
        data-testid={'inputbox-test'}
        name="chat input"
        onChange={onInput}
        value={userInput}
        onKeyDown={keyPress}
        _placeholder={{ opacity: 1, color: 'gray.500' }}
        placeholder="write message here"
      />
      <InputRightElement>
        <IconButton
          size="sm"
          data-testid="send-button-test"
          variant="outline"
          colorScheme="facebook"
          aria-label="Send message"
          icon={<FaArrowCircleRight />}
          onClick={onSubmit}
        />
      </InputRightElement>
    </InputGroup>
  );
};

export default InputBox;
