import React from 'react';
import { cardSuites, cardTypes } from '../../GameLogic/deck';
import { convertCardToEnglish } from '../../GameLogic/gameUtil';
import { CardProps } from '../../types/';
const Card: React.FC<CardProps> = ({ card, cardClick }) => {
  const splitCard = card.split('');
  const value: string = splitCard[0];
  const suit: string = splitCard[1];

  return (
    <div
      className="card"
      onClick={() => cardClick?.(card)}
      title={`${cardTypes[value]} of ${cardSuites[suit]}`}
    >
      <span className={`suit ${cardSuites[suit]}`}>
        {convertCardToEnglish(card)}
      </span>
      {/* <span className="value">{value}</span> */}
    </div>
  );
};

export default Card;
