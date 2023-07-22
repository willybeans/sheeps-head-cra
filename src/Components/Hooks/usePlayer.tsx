import { useReducer } from 'react';
import { cardScoreValues } from '../../GameLogic/deck';
import { TableCard, Player, PlayerScore } from '../../types';

type PlayerAction =
  | { type: 'SET_HAND'; playerId: string; hand: string[] }
  | { type: 'SET_TEAMS'; pickedCard: string; picker: string }
  | { type: 'SET_SCORES'; playerScores: PlayerScore[] }
  | { type: 'MAKE_PICKER'; playerId: string; cards: string[] }
  | { type: 'ADD_WON_CARDS'; playerId: string; cards: string[] }
  | { type: 'PLAY_CARD'; playerId: string; card: string }
  | { type: 'CLEAR_PLAYED_CARDS' }
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
    case 'SET_TEAMS':
      return state.map(player => {
        if (player.id !== action.picker) {
          const inHand: boolean = player.hand.some(card => {
            return card === action.pickedCard;
          });
          if (inHand) {
            return { ...player, onSecretTeam: true };
          } else {
            return { ...player, onSecretTeam: false };
          }
        } else {
          return { ...player, onSecretTeam: true };
        }
      });
    case 'SET_SCORES':
      // this is for doubler
      return state.map(p => {
        const player = action.playerScores.find(player => player.id === p.id)!;
        return {
          ...p,
          score: player.score
        };
      });
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
    case 'CLEAR_PLAYED_CARDS':
      return state.map(player => {
        return {
          ...player,
          cardToPlay: {} as TableCard
        };
      });
    case 'RESET_FOR_NEXT_TURN':
      return state.map(player => ({
        ...player,
        hand: [],
        onSecretTeam: false,
        isPicker: false,
        cardToPlay: {} as TableCard
      }));
    case 'RESET_FOR_NEXT_ROUND':
      return state.map(player => ({
        ...player,
        hand: [],
        isPicker: false,
        onSecretTeam: false,
        cardToPlay: {} as TableCard,
        wonCards: [],
        wonCardsTotal: 0
      }));
    case 'RESET_FOR_NEW_GAME':
      return state.map(player => ({
        ...player,
        hand: [] as string[],
        isPicker: false,
        onSecretTeam: false,
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

  const setTeams = (pickedCard: string, picker: string) => {
    dispatch({ type: 'SET_TEAMS', pickedCard, picker });
  };

  const setScores = (playerScores: PlayerScore[]) => {
    dispatch({ type: 'SET_SCORES', playerScores });
  };

  const addWonCards = (playerId: string, cards: string[]) => {
    dispatch({ type: 'ADD_WON_CARDS', playerId, cards });
  };

  const playCard = (playerId: string, card: string) => {
    dispatch({ type: 'PLAY_CARD', playerId, card });
  };

  const clearPlayedCards = () => {
    dispatch({ type: 'CLEAR_PLAYED_CARDS' });
  };

  const totalWonCards = () => {
    // this should be combined with score
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
    setTeams,
    setScores,
    makePicker,
    addWonCards,
    totalWonCards,
    playCard,
    clearPlayedCards,
    resetForNextTurn,
    resetForNextRound
  };
};

export default usePlayer;
