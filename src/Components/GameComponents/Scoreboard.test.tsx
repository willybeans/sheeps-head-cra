import React from 'react';
import { render } from '@testing-library/react';
import Scoreboard from './Scoreboard';

describe('Scoreboard', () => {
  const scores = [
    { id: 'Player1', score: 10 },
    { id: 'Player2', score: 15 },
    { id: 'Player3', score: 8 }
  ];

  it('renders the scoreboard header', () => {
    const { getByText } = render(<Scoreboard scores={scores} />);
    expect(getByText('Scoreboard')).toBeInTheDocument();
  });

  it('renders the player scores correctly', () => {
    const { getByText } = render(<Scoreboard scores={scores} />);
    scores.forEach(playerScore => {
      const scoreText = `${playerScore.id}: ${playerScore.score}`;
      expect(getByText(scoreText)).toBeInTheDocument();
    });
  });

  it('renders the player scores correctly', () => {
    const { getByText } = render(<Scoreboard scores={scores} />);
    scores.forEach(playerScore => {
      const scoreText = `${playerScore.id}: ${playerScore.score}`;
      expect(getByText(scoreText)).toBeInTheDocument();
    });
  });

  it('renders a <ul> element with correct number of <li> elements', () => {
    const { container } = render(<Scoreboard scores={scores} />);
    const ulElement = container.querySelector('ul');
    expect(ulElement).toBeInTheDocument();

    const liElements = container.querySelectorAll('li');
    expect(liElements.length).toBe(scores.length);
  });
});