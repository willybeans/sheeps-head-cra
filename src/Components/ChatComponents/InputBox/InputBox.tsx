import React, { useState } from 'react';
import styles from './inputbox.module.scss';
import useWebSocket from '../../Hooks/useWebSocket';
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
    <div data-testid={'inputbox-test'} className={styles.inputBox}>
      <input
        type="text"
        name="chat input"
        value={userInput}
        onInput={onInput}
        onKeyDown={keyPress}
        placeholder="write your message here"
      />
      <button onClick={onSubmit}>send</button>
    </div>
  );
};

export default InputBox;
