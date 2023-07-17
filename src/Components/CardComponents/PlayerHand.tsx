import React from 'react';
import Card from './Card';
import { PlayerHandProps } from '../../types';

const PlayerHand: React.FC<PlayerHandProps> = ({ hand, playCard }) => {
  return (
    <div className="player-hand">
      {hand.map(card => (
        <Card key={card} card={card} cardClick={playCard} />
      ))}
    </div>
  );
};

export default PlayerHand;
