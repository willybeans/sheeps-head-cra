export interface GamePlayer {
  id: string;
  hand: string[];
  score: number;
  wonCardsTotal: number;
  cardToPlay: TableCard;
  playCard: (card: string) => void;
  isPicker: boolean;
  wonCards: string[];
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
