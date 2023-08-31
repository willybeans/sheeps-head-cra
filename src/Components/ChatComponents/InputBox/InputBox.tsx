import React from 'react';
import styles from './inputbox.module.scss';
import { CardProps } from '../../../types';

const InputBox: React.FC<CardProps> = ({ card, cardClick }) => {
  return (
    <div
      data-testid={'message-container-test'}
      className={`${styles.InputBox}`}
    >
      <div>input</div>
      <button>send</button>
    </div>
  );
};

export default InputBox;
