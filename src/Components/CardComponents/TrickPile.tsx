import React from 'react';
import Card from './Card';
import { TrickPileProps } from '../../types';

const TrickPile: React.FC<TrickPileProps> = ({ cards }) => {
  return (
    <div className="trick-pile">
      {cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
  );
};

export default TrickPile;
