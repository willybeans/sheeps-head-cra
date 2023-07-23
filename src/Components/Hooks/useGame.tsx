import { useReducer, useEffect } from 'react';
import usePlayer from './usePlayer';
import { createDeck, shuffleDeck } from '../../GameLogic/deck';
import {
  calculateWinner,
  calculateAllPlayersScores
} from '../../GameLogic/gameUtil';
import { TableCard, Player, DeckOfCards, GameState } from '../../types';

type GameAction =
  | { type: 'DEAL_CARDS'; cards: string[] }
  | { type: 'MOVE_TO_NEXT'; playerCount: number }
  | { type: 'SET_PICKER'; playerId: string }
  | { type: 'TABLE_RECEIVE_CARDS'; cards: TableCard[] }
  | { type: 'CALCULATE_HAND_WINNER' }
  // | { type: 'CALCULATE_SCORES' }
  | { type: 'RESET_PLAYERS_FOR_NEW_TURN' }
  | { type: 'RESET_GAME_FOR_NEW_TURN' }
  | { type: 'RESET_ALL' };

const gameReducer = (state: GameState, action: GameAction): GameState => {
  switch (action.type) {
    case 'DEAL_CARDS':
      return {
        ...state,
        blindCards: [...action.cards]
      };
    case 'MOVE_TO_NEXT':
      return {
        ...state,
        currentPlayer: (state.currentPlayer + 1) % action.playerCount
      };
    case 'SET_PICKER':
      return {
        ...state,
        picker: action.playerId
      };
    case 'TABLE_RECEIVE_CARDS':
      return {
        ...state,
        currentCardsOnTable: [...action.cards]
      };
    case 'CALCULATE_HAND_WINNER':
      return {
        ...state,
        currentCardsOnTable: []
      };
    // case 'CALCULATE_SCORES':
    //   // TODO: Implement score calculation
    //   return state;
    case 'RESET_GAME_FOR_NEW_TURN':
      return {
        ...state,
        currentCardsOnTable: [],
        picker: '',
        secretTeam: [],
        otherTeam: [],
        blindCards: []
        // cardToPlay: {} as TableCard
      };
    case 'RESET_ALL':
      return {
        shuffledDeck: [],
        currentCardsOnTable: [],
        currentPlayer: 0,
        picker: '',
        secretTeam: [],
        otherTeam: [],
        blindCards: [],
        setScoreMode: 'leaster'
        // cardToPlay: {} as TableCard
      };
    default:
      return state;
  }
};
// initialPlayers: Player[] was a prop
const useGame = (initialGame: GameState, initialPlayers: Player[]) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialGame);
  const {
    players,
    setHand,
    setScores,
    addWonCards,
    resetForNextTurn,
    makePicker,
    clearPlayedCards,
    setTeams
  } = usePlayer(initialPlayers);

  useEffect(() => {}, []);

  const dealCards = () => {
    let cardCount: number = 0;
    const playerCount: number = players.length;
    const deck = createDeck();
    const shuffledDeck = shuffleDeck(deck) as DeckOfCards;
    let blindCards = [] as string[];
    if (playerCount === 3) {
      cardCount = 10;
    } else if (playerCount === 4) {
      cardCount = 7;
    }
    if (playerCount === 5) {
      cardCount = 6;
    }

    players.forEach((p: Player) => {
      const cards = shuffledDeck.splice(0, cardCount);
      setHand(p.id, cards);
    });

    blindCards = shuffledDeck.splice(0, 2);

    dispatch({ type: 'DEAL_CARDS', cards: blindCards });
  };

  const moveToNext = () => {
    const playerCount = players.length;
    dispatch({ type: 'MOVE_TO_NEXT', playerCount });
  };

  const setPicker = (playerId: string, cards: string[]) => {
    makePicker(playerId, cards);
    dispatch({ type: 'SET_PICKER', playerId });
  };

  const setSecretAndOtherTeam = (namedCard: string, picker: string) => {
    // this might only need to exist on the players
    setTeams(namedCard, picker);
  };

  const tableReceiveCards = () => {
    const cards = players.map((p: Player) => p.cardToPlay);
    dispatch({ type: 'TABLE_RECEIVE_CARDS', cards });
    clearPlayedCards();
  };

  const calculateHandWinner = (cards: TableCard[]) => {
    const winner = calculateWinner(cards);
    addWonCards(winner.id, winner.cards);
    dispatch({ type: 'CALCULATE_HAND_WINNER' });
  };

  const calculateScore = () => {
    const result = calculateAllPlayersScores(players, gameState.setScoreMode);
    setScores(result);
    // dispatch({ type: 'CALCULATE_SCORES' });
  };

  const resetPlayersForNewTurn = () => {
    resetForNextTurn();
    dispatch({ type: 'RESET_PLAYERS_FOR_NEW_TURN' });
    resetForNextTurn();
  };

  const resetGameForNewTurn = () => {
    dispatch({ type: 'RESET_GAME_FOR_NEW_TURN' });
  };

  const resetAll = () => {
    resetForNextTurn();
    dispatch({ type: 'RESET_ALL' });
  };

  return {
    gameState,
    players,
    dealCards,
    moveToNext,
    setPicker,
    setSecretAndOtherTeam,
    tableReceiveCards,
    calculateHandWinner,
    calculateScore,
    resetPlayersForNewTurn,
    resetGameForNewTurn,
    resetAll
  };
};

export default useGame;
