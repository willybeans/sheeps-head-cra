import React from 'react';
import { render } from '@testing-library/react';
import CurrentPlayer from './CurrentPlayer';

describe('CurrentPlayer', () => {
  const currentPlayer = 'Player 2';
  const players = ['Player 1', 'Player 2', 'Player 3'];
  let container: HTMLElement;
  beforeEach(() => {
    container = render(
      <CurrentPlayer currentPlayer={currentPlayer} players={players} />
    ).container;
  });

  it('renders the correct number of players', () => {
    const playerElements = container.querySelectorAll('.player');
    expect(playerElements.length).toBe(players.length);
  });

  it('highlights the current player', () => {
    const activePlayerElement = container.querySelector('.player.active');
    expect(activePlayerElement).toHaveTextContent(currentPlayer);
  });

  it('does not highlight other players', () => {
    const playerElements = container.querySelectorAll('.player');
    playerElements.forEach(playerElement => {
      if (playerElement.textContent !== currentPlayer) {
        expect(playerElement).not.toHaveClass('active');
      }
    });
  });
});
