import { getPlayerIndex } from './gameUtil';
import { player } from './players';
import { Players } from '../types';

describe('getPlayerIndex', () => {
  const players: Players = [
    player('player1'),
    player('player2'),
    player('player3')
  ];

  it('should return the correct index of the player', () => {
    expect(getPlayerIndex(players, 'player1')).toBe(0);
    expect(getPlayerIndex(players, 'player2')).toBe(1);
    expect(getPlayerIndex(players, 'player3')).toBe(2);
  });

  it('should return -1 if the player is not found', () => {
    expect(getPlayerIndex(players, 'player4')).toBe(-1);
  });
});
