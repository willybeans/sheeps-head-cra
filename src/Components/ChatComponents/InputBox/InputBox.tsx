import React, { useRef, LegacyRef } from 'react';
import { InputGroup, InputRightElement, IconButton } from '@chakra-ui/react';
import { FaArrowCircleRight } from 'react-icons/fa';
import { WebSocketSend } from '../../../types';
import InputWrapper from '../InputWrapper/InputWrapper';

const InputBox: React.FC<{
  send: WebSocketSend | ((userInput: string) => Promise<void>) | undefined;
  userId?: string;
}> = props => {
  const userInputRef = useRef<HTMLInputElement | null>(null);
  const onInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (userInputRef && userInputRef.current) {
      userInputRef.current.value = event.target.value;
    }
  };

  const onSubmit = () => {
    if (props.userId !== undefined) {
      let stringified: string = '';
      try {
        stringified = JSON.stringify({
          chatMessage: userInputRef?.current?.value,
          contentType: 'chat',
          // grab from cookie
          userId: props?.userId
        });
        if (props.send) props.send(stringified);
      } catch (e) {
        console.error('parse failed InputBox');
      }
    } else {
      if (props.send) props?.send(userInputRef?.current?.value || '');
    }

    if (userInputRef?.current) userInputRef.current.value = '';
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
