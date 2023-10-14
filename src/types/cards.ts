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
