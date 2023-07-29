import React from 'react';
import Card from '../Card/Card';
import { TableCard } from '../../../types';

interface Props {
  cards?: TableCard[];
}

const TrickPile: React.FC<Props> = ({ cards }) => {
  return (
    <div className="trick-pile">
      {cards?.map((card, index) => <Card key={index} card={card.card} />)}
    </div>
  );
};

export default TrickPile;
