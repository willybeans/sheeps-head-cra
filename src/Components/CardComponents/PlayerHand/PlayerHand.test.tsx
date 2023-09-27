import React from 'react';
import { render } from '@testing-library/react';
import PlayerHand from './PlayerHand';
import { cardTypes, cardSuites } from '../../../GameLogic/deck';
import { convertCardToEnglish } from '../../../GameLogic/gameUtil';

describe('PlayerHand', () => {
  const hand = ['SC', 'EC', 'NC', 'JH', 'QH'];
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of cards', () => {
    const { container } = render(
      <PlayerHand playCard={mockOnClick} hand={hand} />
    );
    const cardElements = container.querySelectorAll('.card');
    expect(cardElements.length).toBe(hand.length);
  });

  it('renders the cards correctly', () => {
    const { container } = render(
      <PlayerHand playCard={mockOnClick} hand={hand} />
    );
    const cardElements = container.querySelectorAll('.card');
    cardElements.forEach((cardElement, index) => {
      const cardString = convertCardToEnglish(hand[index]);
      expect(cardElement).toHaveAttribute('title', cardString);
    });
  });
});
