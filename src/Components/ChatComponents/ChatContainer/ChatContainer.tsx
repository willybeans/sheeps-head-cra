import React from 'react';
import styles from './chatcontainer.module.scss';
import { ChatProps } from '../../../types';
import MessageContainer from '../MessageContainer/MessageContainer';

//might not need props, could just grab directly from socket
const ChatContainer: React.FC = () => {
  return (
    <div
      data-testid={'chat-container-test'}
      className={`${styles.chatContainer}`}
    >
      Chat Container
      {/* <MessageContainer /> */}
    </div>
  );
};

export default ChatContainer;
