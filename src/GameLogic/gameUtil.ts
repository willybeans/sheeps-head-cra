import { GamePlayer, Players } from './players';

export function getPlayerIndex(players: Players, playerId: string) {
  return players.map((p: GamePlayer) => p.id).indexOf(playerId);
}
