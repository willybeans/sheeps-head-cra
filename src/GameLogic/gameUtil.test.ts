// import { getPlayerIndex } from './gameUtil';
import { player } from './players';
// import {  } from '../types';

import {
  getPlayerIndex,
  convertCardToEnglish,
  calculateWinner,
  calculateAllPlayersScores
} from './gameUtil'; // Replace 'yourFileName' with the correct path to your file.
import { TableCard, Player, Players } from '../types';

describe('getPlayerIndex', () => {
  const gamePlayers: Players = [
    player('player1'),
    player('player2'),
    player('player3')
  ];

  it('should return the correct index of the player', () => {
    expect(getPlayerIndex(gamePlayers, 'player1')).toBe(0);
    expect(getPlayerIndex(gamePlayers, 'player2')).toBe(1);
    expect(getPlayerIndex(gamePlayers, 'player3')).toBe(2);
  });

  it('should return -1 if the player is not found', () => {
    expect(getPlayerIndex(gamePlayers, 'player4')).toBe(-1);
  });
});

describe('convertCardToEnglish', () => {
  it('should correctly convert card to English format', () => {
    const card = 'AS';
    const convertedCard = convertCardToEnglish(card);
    expect(convertedCard).toBe('ace of spades');
  });
});

describe('calculateWinner', () => {
  it('should correctly calculate the winning player and cards', () => {
    const cards: TableCard[] = [
      { player: 'player1', card: 'AS' },
      { player: 'player2', card: 'SS' },
      { player: 'player3', card: 'ES' }
    ];
    const { id, cards: winningCards } = calculateWinner(cards);
    expect(id).toBe('player1');
    expect(winningCards).toEqual(['AS', 'SS', 'ES']);
  });
});

describe('calculateAllPlayersScores', () => {
  const players: Player[] = [
    {
      id: 'player1',
      hand: [],
      score: 0,
      wonCardsTotal: 0,
      isPicker: true,
      wonCards: [],
      onSecretTeam: true,
      cardToPlay: {} as TableCard
    },
    {
      id: 'player2',
      hand: [],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      onSecretTeam: true,
      cardToPlay: {} as TableCard
    },
    {
      id: 'player3',
      hand: [],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      onSecretTeam: false,
      cardToPlay: {} as TableCard
    }
  ];

  it('should correctly calculate scores for players in picker mode', () => {
    players[0].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH'];
    players[1].wonCards = ['TH', 'TH'];
    players[2].wonCards = ['TH', 'TH', 'TH', 'TH'];

    const gameMode = 'picker';
    const playerScores = calculateAllPlayersScores(players, gameMode);

    expect(playerScores).toEqual([
      { id: 'player1', score: 2 },
      { id: 'player2', score: 1 },
      { id: 'player3', score: -1 }
    ]);
  });

  it('should correctly calculate scores for players in picker mode', () => {
    players[0].wonCards = ['TH', 'TH'];
    players[1].wonCards = ['TH', 'TH'];
    players[2].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];

    const gameMode = 'picker';
    const playerScores = calculateAllPlayersScores(players, gameMode);

    expect(playerScores).toEqual([
      { id: 'player1', score: -2 },
      { id: 'player2', score: -1 },
      { id: 'player3', score: 1 }
    ]);
  });

  it('should correctly calculate scores for players in picker mode', () => {
    players[0].wonCards = [];
    players[1].wonCards = ['TH', 'TH'];
    players[2].wonCards = [
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH'
    ];

    const gameMode = 'picker';
    const playerScores = calculateAllPlayersScores(players, gameMode);

    expect(playerScores).toEqual([
      { id: 'player1', score: -4 },
      { id: 'player2', score: -2 },
      { id: 'player3', score: 2 }
    ]);
  });

  it('should correctly calculate scores for players in picker mode', () => {
    players[0].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];
    players[1].wonCards = ['TH', 'TH', 'TH'];
    players[2].wonCards = ['TH'];

    const gameMode = 'picker';
    const playerScores = calculateAllPlayersScores(players, gameMode);

    expect(playerScores).toEqual([
      { id: 'player1', score: 4 },
      { id: 'player2', score: 2 },
      { id: 'player3', score: -2 }
    ]);
  });

  it('should correctly calculate scores for players in picker mode', () => {
    players[0].wonCards = [];
    players[1].wonCards = [];
    players[2].wonCards = [
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH',
      'TH'
    ];

    const gameMode = 'picker';
    const playerScores = calculateAllPlayersScores(players, gameMode);

    expect(playerScores).toEqual([
      { id: 'player1', score: -6 },
      { id: 'player2', score: -1 },
      { id: 'player3', score: 3 }
    ]);
  });

  it('should correctly calculate scores for players in picker mode', () => {
    players[0].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];
    players[1].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH'];
    players[2].wonCards = [];
    const gameMode = 'picker';
    const playerScores = calculateAllPlayersScores(players, gameMode);

    expect(playerScores).toEqual([
      { id: 'player1', score: 6 },
      { id: 'player2', score: 3 },
      { id: 'player3', score: -3 }
    ]);
  });
});
