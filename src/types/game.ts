import { GamePlayer, TableCard, Players, Player } from './players';

export interface TurnIndicatorProps {
  currentPlayer: string;
  players: string[];
}

export type PlayCard = (
  card?: string | undefined,
  isPlayerHand?: boolean | undefined
) => void;

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

export interface GameInstance {
  players?: Player[];
  currentCardsOnTable: TableCard[];
  dealer: number;
  isStart: boolean;
  currentPlayer: number;
  picker: string;
  secretTeam: string[];
  otherTeam: string[];
  blindCards: string[];
  setScoreMode: 'picker';
  inProgress: boolean;
}

export interface GameState {
  inPlay: boolean;
  shuffledDeck: string[];
  currentCardsOnTable: TableCard[];
  currentPlayer: number;
  picker: string;
  secretTeam: string[];
  otherTeam: string[];
  blindCards: string[];
  setScoreMode: 'leaster' | 'doubler' | 'picker';
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
