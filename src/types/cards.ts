export interface CardProps {
  card: string;
  cardClick?: (card: string) => void;
}

export interface PlayerHandProps {
  hand: string[];
  playCard: (card: string) => void;
}

export interface TrickPileProps {
  cards: string[];
}
