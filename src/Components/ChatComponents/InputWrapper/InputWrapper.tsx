import React, { LegacyRef } from 'react';
import { Input } from '@chakra-ui/react';

type InputType = {
  userInputRef: LegacyRef<HTMLInputElement> | undefined;
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  keyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

const InputWrapper: React.FC<InputType> = ({
  userInputRef,
  onInput,
  keyPress
}): JSX.Element => {
  return (
    <Input
      data-testid={'inputbox-test'}
      name="chat input"
      onChange={onInput}
      ref={userInputRef}
      onKeyDown={keyPress}
      _placeholder={{ opacity: 1, color: 'gray.500' }}
      placeholder="write message here"
    />
  );
};

export default InputWrapper;
