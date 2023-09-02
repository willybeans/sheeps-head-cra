import React from 'react';
import styles from './messageContainer.module.scss';
import { CardProps } from '../../../types';
import Message from '../Message/Message';

const MessageContainer: React.FC<CardProps> = ({ card, cardClick }) => {
  return (
    <div
      data-testid={'message-container-test'}
      className={`${styles.messageContainer}`}
    ></div>
  );
};

export default MessageContainer;
