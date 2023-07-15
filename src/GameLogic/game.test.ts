import { game, Game } from './game';
import {player, Players} from './players';


describe('game', () => {
  let players: Players;
  let gameInstance: Game;

  beforeEach(() => {
    players = [
      player('player1'),
      player('player2'),
      player('player3'),
    ];

    gameInstance = game(players);
  });

  afterEach(() => {
    players = [];
    // gameInstance = null;
  });

  it('should create a game with the specified players', () => {
    expect(gameInstance.players).toEqual(players);
  });

  it('should initialize the game with the necessary properties', () => {
    expect(gameInstance.shuffledDeck).toEqual([]);
    expect(gameInstance.currentCardsOnTable).toEqual([]);
    expect(gameInstance.currentPlayer).toBe(0);
    expect(gameInstance.picker).toBe('');
    expect(gameInstance.secretTeam).toEqual([]);
    expect(gameInstance.otherTeam).toEqual([]);
    expect(gameInstance.blindCards).toEqual([]);
    expect(gameInstance.setScoreMode).toBe('picker');
  });

  it('should set the picker and move blind cards to the picker', () => {
    gameInstance.blindCards = ['QC', 'KD'];
    gameInstance.setPicker('player1', players);

    expect(gameInstance.picker).toBe('player1');
    expect(gameInstance.players[0].isPicker).toBe(true);
    expect(gameInstance.players[0].hand).not.toContain('QC');
    expect(gameInstance.players[0].hand).not.toContain('KD');
    expect(gameInstance.players[0].wonCards).toContain('QC');
    expect(gameInstance.players[0].wonCards).toContain('KD');
    expect(gameInstance.players[0].cardToPlay).toEqual({});
    expect(gameInstance.blindCards).toEqual([]);
  });

  it('should set the secret team and other team based on the named card', () => {
    gameInstance.picker = 'player1';
    gameInstance.secretTeam = [];
    gameInstance.otherTeam = [];

    gameInstance.players[1].hand = ['AH', 'QC']
    gameInstance.players[2].hand = ['KD', 'TS']

    gameInstance.setSecretAndOtherTeam('AH');


    expect(gameInstance.secretTeam).toEqual(['player1','player2']);
    expect(gameInstance.otherTeam).toEqual(['player3']);
  });

  it('should deal cards to players and move blind cards to the table', () => {
    // gameInstance.shuffledDeck = ['C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA', 'D7', 'D8', 'D9', 'DJ', 'DQ', 'DK', 'DA'];
    gameInstance.newDeck();
    gameInstance.dealCards();

    expect(gameInstance.players[0].hand.length).toEqual(10);
    expect(gameInstance.players[1].hand.length).toEqual(10);
    expect(gameInstance.players[2].hand.length).toEqual(10);
    expect(gameInstance.currentPlayer).toBe(0);
    expect(gameInstance.currentCardsOnTable).toEqual([]);
    expect(gameInstance.blindCards.length).toEqual(2);
  });

  it('should move played cards to the table and calculate the hand winner', () => {
    gameInstance.players[0].cardToPlay = { player: 'player1', card: 'AH' };
    gameInstance.players[1].cardToPlay = { player: 'player2', card: 'TC' };
    gameInstance.players[2].cardToPlay = { player: 'player3', card: 'KS' };

    gameInstance.tableReceiveCard();

    expect(gameInstance.currentCardsOnTable).toEqual([
      { player: 'player1', card: 'AH' },
      { player: 'player2', card: 'TC' },
      { player: 'player3', card: 'KS' },
    ]);

    gameInstance.calculateHandWinner();

    expect(gameInstance.players[0].wonCards).toEqual(['AH', 'TC', 'KS']);
    expect(gameInstance.players[1].wonCards).toEqual([]);
    expect(gameInstance.players[2].wonCards).toEqual([]);
  });

  it('should calculate the score with multipliers, picker wins all', () => {
    gameInstance.setScoreMode = 'picker';
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH' ];
    gameInstance.players[1].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH' ];
    gameInstance.players[2].wonCards = [];

    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];

    gameInstance.calculateScore();

    expect(gameInstance.players[0].score).toBe(6);
    expect(gameInstance.players[1].score).toBe(3);
    expect(gameInstance.players[2].score).toBe(-3);
  });

  it('should calculate the score with multipliers, other team wins all', () => {
    gameInstance.setScoreMode = 'picker';
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].wonCards = [ ];
    gameInstance.players[1].wonCards = [ ];
    gameInstance.players[2].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];

    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];

    gameInstance.calculateScore();

    expect(gameInstance.players[0].score).toBe(-6);
    expect(gameInstance.players[1].score).toBe(-1);
    expect(gameInstance.players[2].score).toBe(3);
  });

  it('should calculate the score with multipliers, other team wins less than 30', () => {
    gameInstance.setScoreMode = 'picker';
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].wonCards = ['TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH' ];
    gameInstance.players[1].wonCards = [ 'TH', 'TH', 'TH' ];
    gameInstance.players[2].wonCards = ['TH' ];

    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];

    gameInstance.calculateScore();

    expect(gameInstance.players[0].score).toBe(4);
    expect(gameInstance.players[1].score).toBe(2);
    expect(gameInstance.players[2].score).toBe(-2);
  });

  it('should calculate the score with multipliers, picker wins less than 30', () => {
    gameInstance.setScoreMode = 'picker';
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].wonCards = [ ];
    gameInstance.players[1].wonCards = [ 'TH', 'TH'  ];
    gameInstance.players[2].wonCards = ['TH','TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];

    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];

    gameInstance.calculateScore();

    expect(gameInstance.players[0].score).toBe(-4);
    expect(gameInstance.players[1].score).toBe(-2);
    expect(gameInstance.players[2].score).toBe(2);
  });

  it('should calculate the score with multipliers, other team loses but with > 30', () => {
    gameInstance.setScoreMode = 'picker';
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].wonCards = [  'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];
    gameInstance.players[1].wonCards = [ 'TH', 'TH'  ];
    gameInstance.players[2].wonCards = ['TH','TH', 'TH', 'TH'];

    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];

    gameInstance.calculateScore();

    expect(gameInstance.players[0].score).toBe(2);
    expect(gameInstance.players[1].score).toBe(1);
    expect(gameInstance.players[2].score).toBe(-1);
  });

  it('should calculate the score with multipliers, secret team loses but with > 30', () => {
    gameInstance.setScoreMode = 'picker';
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].wonCards = [  'TH', 'TH' ];
    gameInstance.players[1].wonCards = [ 'TH', 'TH'  ];
    gameInstance.players[2].wonCards = ['TH','TH', 'TH', 'TH', 'TH', 'TH', 'TH', 'TH'];

    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];

    gameInstance.calculateScore();

    expect(gameInstance.players[0].score).toBe(-2);
    expect(gameInstance.players[1].score).toBe(-1);
    expect(gameInstance.players[2].score).toBe(1);
  });

  it('should reset the players for a new turn', () => {
    gameInstance.players[0].hand = ['SH', 'EH'];
    gameInstance.players[0].isPicker = true;
    gameInstance.players[0].cardToPlay = { player: 'player1', card: 'SH' };

    gameInstance.resetPlayersForNewTurn();

    expect(gameInstance.players[0].hand).toEqual([]);
    expect(gameInstance.players[0].isPicker).toBe(false);
    expect(gameInstance.players[0].cardToPlay).toEqual({});
  });

  it('should reset the game for a new turn', () => {
    gameInstance.picker = 'player1';
    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];
    gameInstance.currentPlayer = 2;
    gameInstance.currentCardsOnTable = [
      { player: 'player1', card: 'SH' },
      { player: 'player2', card: 'EH' },
      { player: 'player3', card: 'NH' },
    ];
    gameInstance.newDeck();

    gameInstance.resetGameForNewTurn();

    expect(gameInstance.picker).toBe('');
    expect(gameInstance.secretTeam).toEqual([]);
    expect(gameInstance.otherTeam).toEqual([]);
    expect(gameInstance.currentPlayer).toBe(0);
    expect(gameInstance.currentCardsOnTable).toEqual([]);
    expect(gameInstance.shuffledDeck).toEqual([]);
    expect(gameInstance.players[0].hand).toEqual([]);
    expect(gameInstance.players[1].hand).toEqual([]);
    expect(gameInstance.players[2].hand).toEqual([]);
  });

  it('should reset the game for a new game', () => {
    gameInstance.picker = 'player1';
    gameInstance.secretTeam = ['player1', 'player2'];
    gameInstance.otherTeam = ['player3'];
    gameInstance.currentPlayer = 2;
    gameInstance.currentCardsOnTable = [
      { player: 'player1', card: 'AH' },
      { player: 'player2', card: 'KD' },
      { player: 'player3', card: 'JD' },
    ];
    gameInstance.newDeck();
    gameInstance.players[0].score = 5;
    gameInstance.players[1].score = 2;
    gameInstance.players[2].score = -3;

    gameInstance.resetAll();

    expect(gameInstance.picker).toBe('');
    expect(gameInstance.secretTeam).toEqual([]);
    expect(gameInstance.otherTeam).toEqual([]);
    expect(gameInstance.currentPlayer).toBe(0);
    expect(gameInstance.currentCardsOnTable).toEqual([]);
    expect(gameInstance.shuffledDeck).toEqual([]);
    expect(gameInstance.players[0].hand).toEqual([]);
    expect(gameInstance.players[1].hand).toEqual([]);
    expect(gameInstance.players[2].hand).toEqual([]);
    expect(gameInstance.players[0].score).toBe(0);
    expect(gameInstance.players[1].score).toBe(0);
    expect(gameInstance.players[2].score).toBe(0);
  });
});
