import React from 'react';
import styles from './message.module.scss';
import { MessageBody } from '../../../types';

const Message: React.FC<MessageBody> = ({ name, content, time }) => {
  return (
    <div data-testid={'message-test'} className={`${styles.message}`}>
      <div className={styles.name}>{name}:</div>
      <div className={styles.time}>{time}:</div>
      <div className={styles.content}>{content}</div>
    </div>
  );
};

export default Message;
