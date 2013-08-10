import React from 'react';
import { cardSuites, cardTypes } from '../../../GameLogic/deck';
import { convertCardToEnglish } from '../../../GameLogic/gameUtil';
import styles from './card.module.scss';
import { CardProps } from '../../../types/';
import { SvgMap } from '../../../utils/svgMap';
const Card: React.FC<CardProps> = ({ card, cardClick }) => {
  const splitCard = card.split('');
  const value: string = splitCard[0];
  const suit: string = splitCard[1];
  console.log('vals', value, suit);
  return (
    <div
      data-testid={'card-test'}
      className={styles.card}
      onClick={() => cardClick?.(card)}
      title={
        card === 'BACK'
          ? 'Back of Card'
          : `${cardTypes[value]} of ${cardSuites[suit]}`
      }
    >
      <img src={SvgMap(card)} />
      <span className={`suit ${cardSuites[suit]}`}>
        {convertCardToEnglish(card)}
      </span>
    </div>
  );
};

export default Card;
