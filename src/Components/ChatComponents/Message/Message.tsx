import React from 'react';
import styles from './message.module.scss';
import { CardProps } from '../../../types';

const Message: React.FC<CardProps> = ({ card, cardClick }) => {
  return (
    <div data-testid={'message-container-test'} className={`${styles.message}`}>
      <div>Name</div>
      <div>Message</div>
    </div>
  );
};

export default Message;
