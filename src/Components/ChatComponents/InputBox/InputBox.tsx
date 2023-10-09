import React, { useRef, LegacyRef } from 'react';
import { InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { WebSocketSend } from '../../../types';
import InputWrapper from '../InputWrapper/InputWrapper';

const InputBox: React.FC<{ send: WebSocketSend | undefined }> = props => {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userInputRef && userInputRef.current) {
      userInputRef.current.value = event.target.value;
    }
  };

  const onSubmit = () => {
    let parsed: string = '';
    try {
      parsed = JSON.stringify({
        // time,
        content: userInputRef?.current?.value,
        contentType: 'chat',
        userId: 'd2792a62-86a4-4c49-a909-b1e762c683a3'
      });
      if (props.send) {
        props.send(parsed);
      }
    } catch (e) {
      console.error('parse failed InputBox');
    }
    if (userInputRef && userInputRef.current) {
      userInputRef.current.value = '';
    }
  };

  const keyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <InputGroup size={'md'}>
      <InputWrapper
        userInputRef={userInputRef}
        onInput={onInput}
        keyPress={keyPress}
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
