import { Player } from '../types';

export function getPlayerIndex(players?: Player[], playerId?: string) {
  return players?.map((p: Player) => p.id).indexOf(playerId || '');
}

const blindCards: string[] = ['JD', 'AH', 'AC', 'AS', 'AD'];
