import React from 'react';
import { TurnIndicatorProps } from '../../types';

const TurnIndicator: React.FC<TurnIndicatorProps> = ({
  currentPlayer,
  players
}) => {
  return (
    <div className="turn-indicator">
      {players.map(player => (
        <div
          key={player}
          className={`player ${player === currentPlayer ? 'active' : ''}`}
        >
          {player}
        </div>
      ))}
    </div>
  );
};

export default TurnIndicator;
