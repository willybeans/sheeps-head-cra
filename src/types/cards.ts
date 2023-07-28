export interface Cards {
  [key: string]: string;
}

export interface Values {
  [key: string]: number;
}

export type DeckOfCards = Array<string>;

export type CardValues =
  | '7'
  | '8'
  | '9'
  | '10'
  | 'jack'
  | 'queen'
  | 'king'
  | 'ace';

export type CardSuites = 'clubs' | 'spades' | 'hearts' | 'diamonds';

export interface CardProps {
  card: string;
  cardClick?: (card: string) => void;
}

export interface PlayerHandProps {
  hand: string[];
  playCard: (card: string) => void;
}
