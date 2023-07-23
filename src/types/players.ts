export interface GamePlayer {
  id: string;
  hand: string[];
  score: number;
  wonCardsTotal: number;
  isPicker: boolean;
  wonCards: string[];
  cardToPlay: TableCard;
  playCard: (card: string) => void;
  makePicker: (cards: string[]) => void;
  getTotalForCards: () => void;
  resetForNextTurn: () => void;
  resetForNextRound: () => void;
  resetForNewGame: () => void;
}

export type Players = GamePlayer[];

export interface TableCard {
  player: string;
  card: string;
}

export interface WinningCard extends TableCard {
  gameValue: number;
}

export interface Player {
  id: string;
  hand: string[];
  score: number;
  onSecretTeam: boolean;
  wonCardsTotal: number;
  isPicker: boolean;
  wonCards: string[];
  cardToPlay: TableCard;
}
