import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../CardComponents/PlayerHand';
import TrickPile from '../CardComponents/TrickPile';
import Scoreboard from './Scoreboard';
import CurrentPlayer from './CurrentPlayer';
import {
  GameBoardProps,
  ScoreboardProps,
  Players,
  Game,
  GamePlayer
} from '../../types';

const GameBoard: React.FC<Game> = ({ players }) => {
  const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  const [trickCards, setTrickCards] = useState<string[]>([]);
  const [scores, setScores] = useState<number[]>();

  useEffect(() => {
    let getScores = players.map((p: GamePlayer) => p.score);
    setScores([...getScores]);
  });
  const playCard = (card: string) => {
    // Logic to handle playing a card in the game
    // Update currentPlayer, trickCards, scores, etc.
  };

  return (
    <div className="game-board">
      {/* <CurrentPlayer currentPlayer={currentPlayer} players={players} /> */}
      <PlayerHand hand={[]} playCard={playCard} />
      <TrickPile cards={trickCards} />
      {/* <Scoreboard scores={scores} /> */}
    </div>
  );
};

export default GameBoard;
