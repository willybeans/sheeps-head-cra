import { GamePlayer, TableCard, Players } from './players';

export interface TurnIndicatorProps {
  currentPlayer: string;
  players: string[];
}

export interface GameBoardProps {
  players: string[];
}

export interface PlayerScore {
  id: string;
  score: number;
}

export interface ScoreboardProps {
  scores: PlayerScore[];
}

export interface Game {
  players: GamePlayer[];
  shuffledDeck: string[];
  currentCardsOnTable: TableCard[];
  currentPlayer: number;
  picker: string;
  secretTeam: string[];
  otherTeam: string[];
  blindCards: string[];
  setScoreMode: 'leaster' | 'doubler' | 'picker'; // is this right? picker? im not sure
  newDeck: () => void;
  moveToNext: () => void;
  setPicker: (playerId: string, players: Players) => void;
  setSecretAndOtherTeam: (namedCard: string) => void;
  dealCards: () => void;
  tableReceiveCard: () => void;
  calculateHandWinner: () => void;
  calculateScore: () => void;
  resetPlayersForNewTurn: () => void;
  resetGameForNewTurn: () => void;
  resetAll: () => void;
}
