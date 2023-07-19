import react, { useState, useEffect, useReducer } from 'react';
import { player as playerObj } from '../../GameLogic/players';
import { GamePlayer } from '../../types';

type PlayerReducerState = {
  id?: string;
  hand?: string[];
};

type ACTIONTYPE = { type: 'updateId' } | { type: 'updateHand'; hand: string[] };

function playerReducer(
  state: PlayerReducerState,
  action: ACTIONTYPE
): PlayerReducerState {
  if (action.type === 'updateId') {
    return {
      id: '123445'
    };
  } else if (action.type === 'updateHand') {
    return {
      hand: [...action.hand]
    };
  }
  throw Error('Unknown action.');
}

const initialState = { id: 'player0', hand: [] };

type PlayerInit = {
  id?: string;
  hand?: string[];
};

type Return = {
  state: PlayerReducerState;
  dispatch: react.Dispatch<ACTIONTYPE>;
};

// export const playerFactory

export const usePlayer = (player: PlayerInit): Return => {
  const [state, dispatch] = useReducer(playerReducer, initialState);

  useEffect(() => {}, []);

  return {
    state,
    dispatch
  };
};
