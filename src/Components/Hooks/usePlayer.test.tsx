import { renderHook, act } from '@testing-library/react';
import usePlayer from './usePlayer';
import { TableCard, Player } from '../../types';

describe('usePlayer', () => {
  const initialPlayers: Player[] = [
    {
      id: 'player0',
      hand: [],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      cardToPlay: {} as TableCard
    },
    {
      id: 'player1',
      hand: [],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      cardToPlay: {} as TableCard
    },
    {
      id: 'player2',
      hand: [],
      score: 0,
      wonCardsTotal: 0,
      isPicker: false,
      wonCards: [],
      cardToPlay: {} as TableCard
    }
  ];

  it('should initialize with the provided players', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { players } = result.current;
    expect(players).toEqual(initialPlayers);
  });

  it('should set the hand for a player', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { setHand } = result.current;
    const playerId = 'player0';
    const hand = ['AH', 'KH', 'QH'];

    act(() => {
      setHand(playerId, hand);
    });

    const { players } = result.current;
    const updatedPlayer = players.find(player => player.id === playerId);
    expect(updatedPlayer?.hand).toEqual(hand);
  });

  it('should make player picker, and push blind cards to won pile', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { makePicker } = result.current;
    const playerId = 'player0';
    const cards = ['AH', 'KH'];

    act(() => {
      makePicker(playerId, cards);
    });

    const { players } = result.current;
    const updatedPlayer = players.find(player => player.id === playerId);
    expect(updatedPlayer?.wonCards).toEqual(cards);
    expect(updatedPlayer?.isPicker).toEqual(true);
  });

  it("should add a card to a player's won cards pile", () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { addWonCard } = result.current;
    const playerId = 'player1';
    const cards = ['AH', 'KH'];

    act(() => {
      addWonCard(playerId, cards);
    });

    const { players } = result.current;
    const updatedPlayer = players.find(player => player.id === playerId);
    expect(updatedPlayer?.wonCards).toEqual(cards);
  });

  it('should play a card for a player', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { playCard, setHand } = result.current;
    const hand = ['AH', 'KH', 'JC'];
    const playerId = 'player2';
    const card = 'JC';

    act(() => {
      setHand(playerId, hand);
      playCard(playerId, card);
    });

    const { players } = result.current;
    const updatedPlayer = players.find(player => player.id === playerId);
    expect(updatedPlayer?.hand).not.toContain(card);
    expect(updatedPlayer?.cardToPlay).toEqual({ player: playerId, card });
  });

  it('should calculate all won cards totals', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { totalWonCards } = result.current;

    const player0 = 'player0';
    const cards0 = ['AC', 'KS', 'QS'];

    const player1 = 'player1';
    const cards1 = ['AH', 'KH', 'SH'];

    const player2 = 'player2';
    const cards2 = ['JD', 'SS', 'ES'];

    act(() => {
      totalWonCards();
    });

    const { players } = result.current;
    players.forEach(player => {
      expect(player.wonCardsTotal).toBe(0);
    });

    // Update the players' won cards
    const { addWonCard } = result.current;

    act(() => {
      addWonCard(player0, cards0);
      addWonCard(player1, cards1);
      addWonCard(player2, cards2);
    });

    // Calculate total won cards again
    act(() => {
      totalWonCards();
    });

    const updatedPlayers = result.current.players;
    expect(updatedPlayers[0].wonCardsTotal).toEqual(18);
    expect(updatedPlayers[1].wonCardsTotal).toEqual(15);
    expect(updatedPlayers[2].wonCardsTotal).toEqual(2);
  });

  it('should reset for the next turn', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { resetForNextTurn } = result.current;

    act(() => {
      resetForNextTurn();
    });

    const { players } = result.current;
    players.forEach(player => {
      expect(player.hand).toEqual([]);
      expect(player.isPicker).toBe(false);
      expect(player.cardToPlay).toEqual({});
    });
  });

  it('should reset for the next round', () => {
    const { result } = renderHook(() => usePlayer(initialPlayers));
    const { resetForNextRound } = result.current;

    act(() => {
      resetForNextRound();
    });

    const { players } = result.current;
    players.forEach(player => {
      expect(player.hand).toEqual([]);
      expect(player.isPicker).toBe(false);
      expect(player.cardToPlay).toEqual({});
      expect(player.wonCards).toEqual([]);
      expect(player.wonCardsTotal).toBe(0);
    });
  });
});
