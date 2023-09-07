import React from 'react';
import styles from './messageContainer.module.scss';
import Message from '../Message/Message';
import useWebSocket from '../../Hooks/useWebSocket';

const MessageContainer: React.FC = () => {
  const { receivedMessages } = useWebSocket();
  return (
    <div
      data-testid={'message-container-test'}
      className={`${styles.messageContainer}`}
    >
      message container
      {receivedMessages.map((obj, i) => {
        return (
          <Message
            key={`message-${i}`}
            time={obj.time}
            name={obj.name}
            content={obj.content}
          />
        );
      })}
    </div>
  );
};

export default MessageContainer;
