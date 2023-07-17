import { GamePlayer, Players, CardValues, CardSuites } from '../types';
import { cardSuites, cardTypes } from './deck';

export function getPlayerIndex(players: Players, playerId: string) {
  return players.map((p: GamePlayer) => p.id).indexOf(playerId);
}

export function convertCardToEnglish(card: string): string {
  const splitCard = card.split('');
  const value: string = cardTypes[splitCard[0]] as CardValues;
  const suit: string = cardSuites[splitCard[1]] as CardSuites;

  return `${value} ${suit} `;
}
