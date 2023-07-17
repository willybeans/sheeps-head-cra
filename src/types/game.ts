export interface TurnIndicatorProps {
  currentPlayer: string;
  players: string[];
}

export interface GameBoardProps {
  players: string[];
}

export interface PlayerScore {
  name: string;
  score: number;
}

export interface ScoreboardProps {
  scores: PlayerScore[];
}
