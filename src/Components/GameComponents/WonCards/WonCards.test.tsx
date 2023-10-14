import React from 'react';
import { render } from '@testing-library/react';
import Scoreboard from './WonCards';
import { PlayerScore } from '../../../types';
import WonCards from './WonCards';

describe('won cards component', () => {
  //   const scores: PlayerScore[] = [
  //     { id: 'Player1', score: 10 },
  //     { id: 'Player2', score: 15 },
  //     { id: 'Player3', score: 8 }
  //   ];

  it('renders the won cards header', () => {
    const { getByText } = render(<WonCards />);
    expect(getByText('Won Cards:')).toBeInTheDocument();
  });

  //   it('renders the player scores correctly', () => {
  //     const { getByText } = render(<Scoreboard scores={scores} />);
  //     scores.forEach(playerScore => {
  //       const scoreText = `${playerScore.id}: ${playerScore.score}`;
  //       expect(getByText(scoreText)).toBeInTheDocument();
  //     });
  //   });

  //   it('renders the player scores correctly', () => {
  //     const { getByText } = render(<Scoreboard scores={scores} />);
  //     scores.forEach(playerScore => {
  //       const scoreText = `${playerScore.id}: ${playerScore.score}`;
  //       expect(getByText(scoreText)).toBeInTheDocument();
  //     });
  //   });

  //   it('renders a <ul> element with correct number of <li> elements', () => {
  //     const { container } = render(<Scoreboard scores={scores} />);
  //     const ulElement = container.querySelector('ul');
  //     expect(ulElement).toBeInTheDocument();

  //     const liElements = container.querySelectorAll('li');
  //     expect(liElements.length).toBe(scores.length);
  //   });
});
