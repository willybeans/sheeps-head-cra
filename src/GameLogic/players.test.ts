import { player, GamePlayer } from './players';

describe('player', () => {
  let gamePlayer: GamePlayer;

  beforeEach(() => {
    gamePlayer = player('player1');
  });

  it('should create a new game player with the provided id', () => {
    expect(gamePlayer.id).toBe('player1');
  });

  it('should initialize game player properties correctly', () => {
    expect(gamePlayer.hand).toEqual([]);
    expect(gamePlayer.score).toBe(0);
    expect(gamePlayer.wonCardsTotal).toBe(0);
    expect(gamePlayer.isPicker).toBe(false);
    expect(gamePlayer.cardToPlay).toEqual({});
    expect(gamePlayer.wonCards).toEqual([]);
  });

  it("should update the player's hand and cardToPlay when playCard is called", () => {
    const newCardToPlay = 'AH';
    gamePlayer.playCard(newCardToPlay);

    expect(gamePlayer.hand).not.toContain(newCardToPlay);
    expect(gamePlayer.cardToPlay).toEqual({
      player: 'player1',
      card: newCardToPlay
    });
  });

  it('should calculate the total score for won cards correctly', () => {
    gamePlayer.wonCards = ['AH', 'TC', 'KH', 'NH', 'ES', 'SS'];

    gamePlayer.getTotalForCards();

    expect(gamePlayer.wonCardsTotal).toBe(25); // Ace: 11 + Ten: 10 + King: 4 = 25
  });

  it('should reset player properties for the next turn', () => {
    gamePlayer.isPicker = true;
    gamePlayer.hand = ['AH', 'ED', 'JD', 'SS', 'QH', 'EH'];
    gamePlayer.cardToPlay = { player: 'player1', card: 'AH' };

    gamePlayer.resetForNextTurn();

    expect(gamePlayer.hand).toEqual([]);
    expect(gamePlayer.isPicker).toBe(false);
    expect(gamePlayer.cardToPlay).toEqual({});
  });

  it('should reset player properties for the next round', () => {
    gamePlayer.isPicker = true;
    gamePlayer.hand = ['AH', 'ED', 'JD', 'SS', 'QH', 'EH'];
    gamePlayer.cardToPlay = { player: 'player1', card: 'AH' };
    gamePlayer.score = 10;

    gamePlayer.resetForNextRound();

    expect(gamePlayer.hand).toEqual([]);
    expect(gamePlayer.isPicker).toBe(false);
    expect(gamePlayer.cardToPlay).toEqual({});
    expect(gamePlayer.wonCards).toEqual([]);
    expect(gamePlayer.wonCardsTotal).toBe(0);
    expect(gamePlayer.score).toBe(10);
  });

  it('should reset player properties for a new game', () => {
    gamePlayer.isPicker = true;
    gamePlayer.hand = ['AH', 'ED', 'JD', 'SS', 'QH', 'EH'];
    gamePlayer.cardToPlay = { player: 'player1', card: 'AH' };
    gamePlayer.score = 10;

    gamePlayer.resetForNewGame();

    expect(gamePlayer.hand).toEqual([]);
    expect(gamePlayer.isPicker).toBe(false);
    expect(gamePlayer.cardToPlay).toEqual({});
    expect(gamePlayer.wonCards).toEqual([]);
    expect(gamePlayer.wonCardsTotal).toBe(0);
    expect(gamePlayer.score).toBe(0);
  });
});
