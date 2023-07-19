import { useReducer } from 'react';
import { cardScoreValues } from '../../GameLogic/deck';
import { TableCard, Player } from '../../types';

type PlayerAction =
  | { type: 'SET_HAND'; playerId: string; hand: string[] }
  | { type: 'MAKE_PICKER'; playerId: string; cards: string[] }
  | { type: 'ADD_WON_CARDS'; playerId: string; cards: string[] }
  | { type: 'PLAY_CARD'; playerId: string; card: string }
  | { type: 'TOTAL_WON_CARDS' }
  | { type: 'RESET_FOR_NEXT_TURN' }
  | { type: 'RESET_FOR_NEXT_ROUND' }
  | { type: 'RESET_FOR_NEW_GAME' };

const playerReducer = (state: Player[], action: PlayerAction): Player[] => {
  switch (action.type) {
    case 'SET_HAND':
      return state.map(player =>
        player.id === action.playerId
          ? { ...player, hand: action.hand }
          : player
      );
    case 'MAKE_PICKER':
      return state.map(player =>
        player.id === action.playerId
          ? {
              ...player,
              isPicker: true,
              wonCards: [...player.wonCards, ...action.cards]
            }
          : player
      );
    case 'ADD_WON_CARDS':
      return state.map(player =>
        player.id === action.playerId
          ? { ...player, wonCards: [...player.wonCards, ...action.cards] }
          : player
      );
    case 'TOTAL_WON_CARDS':
      return state.map((player, index) => {
        let total = 0;
        player.wonCards.forEach((c: string) => {
          const split = c.split('');
          const cardType = split[0];
          const suit = split[1]; // this might not matter
          total += cardScoreValues[cardType];
        });

        return { ...player, wonCardsTotal: total };
      });
    case 'PLAY_CARD':
      return state.map(player =>
        player.id === action.playerId
          ? {
              ...player,
              hand: player.hand.filter(card => card !== action.card),
              cardToPlay: {
                player: player.id,
                card: action.card
              }
            }
          : player
      );
    case 'RESET_FOR_NEXT_TURN':
      return state.map(player => ({
        ...player,
        hand: [],
        isPicker: false,
        cardToPlay: {} as TableCard
      }));
    case 'RESET_FOR_NEXT_ROUND':
      return state.map(player => ({
        ...player,
        hand: [],
        isPicker: false,
        cardToPlay: {} as TableCard,
        wonCards: [],
        wonCardsTotal: 0
      }));
    case 'RESET_FOR_NEW_GAME':
      return state.map(player => ({
        ...player,
        hand: [] as string[],
        isPicker: false,
        cardToPlay: {} as TableCard,
        wonCards: [] as string[],
        wonCardsTotal: 0,
        score: 0
      }));
    default:
      return state;
  }
};

const usePlayer = (initialPlayers: Player[]) => {
  const [players, dispatch] = useReducer(playerReducer, initialPlayers);

  const setHand = (playerId: string, hand: string[]) => {
    dispatch({ type: 'SET_HAND', playerId, hand });
  };

  const makePicker = (playerId: string, cards: string[]) => {
    dispatch({ type: 'MAKE_PICKER', playerId, cards });
  };

  const addWonCard = (playerId: string, cards: string[]) => {
    dispatch({ type: 'ADD_WON_CARDS', playerId, cards });
  };

  const playCard = (playerId: string, card: string) => {
    dispatch({ type: 'PLAY_CARD', playerId, card });
  };

  const totalWonCards = () => {
    dispatch({ type: 'TOTAL_WON_CARDS' });
  };

  const resetForNextTurn = () => {
    dispatch({ type: 'RESET_FOR_NEXT_TURN' });
  };

  const resetForNextRound = () => {
    dispatch({ type: 'RESET_FOR_NEXT_ROUND' });
  };

  return {
    players,
    setHand,
    makePicker,
    addWonCard,
    totalWonCards,
    playCard,
    resetForNextTurn,
    resetForNextRound
  };
};

export default usePlayer;
