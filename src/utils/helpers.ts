import { Player } from '../types';

export function getPlayerIndex(players?: Player[], playerId?: string) {
  return players?.map((p: Player) => p.id).indexOf(playerId || '');
}

export const getEnv =
  process.env.NODE_ENV === 'production'
    ? 'https://sheepshead-ts-api.onrender.com'
    : 'http://localhost:8080';

export const blindCards: string[] = ['JD', 'AH', 'AC', 'AS', 'AD'];
