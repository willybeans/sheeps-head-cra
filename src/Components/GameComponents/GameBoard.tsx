import React, { useState, useEffect, SetStateAction } from 'react';
import PlayerHand from '../CardComponents/PlayerHand/PlayerHand';
import TrickPile from '../CardComponents/TrickPile/TrickPile';
import Scoreboard from './Scoreboard/Scoreboard';
import CurrentPlayer from './CurrentPlayer';
import { Player, TableCard, PlayerScore, GameState } from '../../types';
import usePlayer from '../Hooks/usePlayer';
import useGame from '../Hooks/useGame';

import { GameBoardProps, Players, Game, GamePlayer } from '../../types';

const initialPlayers: Player[] = [
  {
    id: 'player1',
    hand: ['A♠', 'K♠', 'Q♠', 'J♠', '10♠'],
    score: 21,
    wonCardsTotal: 0,
    isPicker: false,
    wonCards: [],
    onSecretTeam: true,
    cardToPlay: {} as TableCard
  },
  {
    id: 'player2',
    hand: ['2♠', '3♠', '4♠', '5♠', '6♠'],
    score: 2,
    wonCardsTotal: 0,
    isPicker: false,
    wonCards: [],
    onSecretTeam: true,
    cardToPlay: {} as TableCard
  },
  {
    id: 'player3',
    hand: ['7♠', '8♠', '9♠', '10♠', 'J♠'],
    score: -1,
    wonCardsTotal: 0,
    isPicker: false,
    wonCards: [],
    onSecretTeam: false,
    cardToPlay: {} as TableCard
  }
];

const initialGame: GameState = {
  shuffledDeck: [],
  currentCardsOnTable: [
    { player: 'player1', card: 'AS' },
    { player: 'player2', card: 'SS' },
    { player: 'player3', card: 'ES' }
  ],
  currentPlayer: 0,
  inPlay: true,
  picker: '',
  secretTeam: [],
  otherTeam: [],
  blindCards: [],
  setScoreMode: 'picker'
};

const GameBoard: React.FC = () => {
  // const { players } = usePlayer(initialPlayers);
  const { gameState, players } = useGame(initialGame, initialPlayers);

  // const [currentPlayer, setCurrentPlayer] = useState(players[0]);
  // const [trickCards, setTrickCards] = useState<string[]>([]);
  const [scores, setScores] = useState<PlayerScore[]>();

  const hand1 = ['AH', 'AC', 'AS', 'KS', 'QS'];
  const hand2 = ['JD', 'KC', 'SS', 'ES', 'TS'];

  useEffect(() => {
    const scoreMap: PlayerScore[] = players.map(p => ({
      id: p.id,
      score: Number(p.score)
    }));
    setScores(scoreMap);

    // setTrickCards();
  }, [players]);

  useEffect(() => {}, [gameState]);

  const playCard = (card: string) => {
    // Logic to handle playing a card in the game
    // Update currentPlayer, trickCards, scores, etc.
  };

  return (
    <div className="game-board">
      {/* <CurrentPlayer currentPlayer={currentPlayer} players={players} /> */}
      {}
      <Scoreboard scores={scores} />
      {/* <TrickPile cards={trickCards} /> */}
      <PlayerHand hand={[]} playCard={playCard} />
    </div>
  );
};

export default GameBoard;