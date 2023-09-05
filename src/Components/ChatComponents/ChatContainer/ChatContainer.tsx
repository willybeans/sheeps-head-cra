import React from 'react';
import styles from './chatcontainer.module.scss';
import { ChatProps } from '../../../types';
import MessageContainer from '../MessageContainer/MessageContainer';
import InputBox from '../InputBox/InputBox';

//might not need props, could just grab directly from socket
const ChatContainer: React.FC = () => {
  return (
    <div
      data-testid={'chat-container-test'}
      className={`${styles.chatContainer}`}
    >
      <MessageContainer />
      <InputBox />
    </div>
  );
};

export default ChatContainer;
