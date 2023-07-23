import { renderHook, act } from '@testing-library/react';
import useGame from './useGame';
import usePlayer from './usePlayer';
import { Player, GameState, TableCard } from '../../types';
import { calculateWinner } from '../../GameLogic/gameUtil';

describe('useGame', () => {
  // Sample initial data for testing
  const initialGame: GameState = {
    shuffledDeck: [],
    currentCardsOnTable: [],
    currentPlayer: 0,
    picker: '',
    secretTeam: [],
    otherTeam: [],
    blindCards: [],
    setScoreMode: 'leaster'
  };

  const initialPlayers: Player[] = [
    {
      id: 'player1',
      hand: ['A♠', 'K♠', 'Q♠', 'J♠', '10♠'],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      onSecretTeam: true,
      cardToPlay: {} as TableCard
    },
    {
      id: 'player2',
      hand: ['2♠', '3♠', '4♠', '5♠', '6♠'],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      onSecretTeam: true,
      cardToPlay: {} as TableCard
    },
    {
      id: 'player3',
      hand: ['7♠', '8♠', '9♠', '10♠', 'J♠'],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      onSecretTeam: false,
      cardToPlay: {} as TableCard
    }
  ];

  test('should correctly initialize game state', () => {
    const { result } = renderHook(() => useGame(initialGame, initialPlayers));
    const { gameState } = result.current;
    expect(gameState).toEqual(initialGame);
  });

  test('should correctly deal cards', () => {
    const { result } = renderHook(() => useGame(initialGame, initialPlayers));
    const { dealCards } = result.current;
    act(() => {
      dealCards();
    });

    expect(result.current.gameState.blindCards).toHaveLength(2);
    expect(result.current.players[0].hand).toHaveLength(10);
    expect(result.current.players[1].hand).toHaveLength(10);
    expect(result.current.players[2].hand).toHaveLength(10);
  });

  test('should correctly move to the next player', () => {
    const { result } = renderHook(() => useGame(initialGame, initialPlayers));
    const { moveToNext } = result.current;
    expect(result.current.gameState.currentPlayer).toBe(0);
    act(() => {
      moveToNext();
    });
    expect(result.current.gameState.currentPlayer).toBe(1);
    act(() => {
      moveToNext();
    });
    expect(result.current.gameState.currentPlayer).toBe(2);
    act(() => {
      moveToNext();
    });
    expect(result.current.gameState.currentPlayer).toBe(0);
  });

  test('should correctly set picker and pickers won cards', () => {
    const { result } = renderHook(() => useGame(initialGame, initialPlayers));
    const { setPicker, dealCards } = result.current;
    act(() => {
      dealCards();
    });
    const blindCards = result.current.gameState.blindCards;
    act(() => {
      setPicker('player1', blindCards);
    });
    expect(result.current.gameState.picker).toBe('player1');
    expect(result.current.players[0].wonCards).toEqual(blindCards);
  });

  test('should correctly receive cards on the table', () => {
    const { result } = renderHook(() => useGame(initialGame, initialPlayers));
    const { tableReceiveCards } = result.current;
    act(() => {
      result.current.players[0].cardToPlay = { player: 'player1', card: 'AS' };
      result.current.players[1].cardToPlay = { player: 'player2', card: 'SS' };
      result.current.players[2].cardToPlay = { player: 'player3', card: 'ES' };
      tableReceiveCards();
    });
    expect(result.current.gameState.currentCardsOnTable).toEqual([
      { player: 'player1', card: 'AS' },
      { player: 'player2', card: 'SS' },
      { player: 'player3', card: 'ES' }
    ]);
  });

  test('should correctly calculate hand winner', () => {
    const { result } = renderHook(() => useGame(initialGame, initialPlayers));
    const { calculateHandWinner, tableReceiveCards } = result.current;
    act(() => {
      result.current.players[0].cardToPlay = { player: 'player1', card: 'AS' };
      result.current.players[1].cardToPlay = { player: 'player2', card: 'SS' };
      result.current.players[2].cardToPlay = { player: 'player3', card: 'ES' };
      tableReceiveCards();
    });

    expect(result.current.gameState.currentCardsOnTable).toEqual([
      { player: 'player1', card: 'AS' },
      { player: 'player2', card: 'SS' },
      { player: 'player3', card: 'ES' }
    ]);
    expect(result.current.players[0].cardToPlay).toEqual({});
    expect(result.current.players[1].cardToPlay).toEqual({});
    expect(result.current.players[2].cardToPlay).toEqual({});

    const cards = result.current.gameState.currentCardsOnTable;

    act(() => {
      calculateHandWinner(cards);
    });

    expect(result.current.players[0].wonCards).toEqual(['AS', 'SS', 'ES']);
    expect(result.current.gameState.currentCardsOnTable).toEqual([]);
  });
});
