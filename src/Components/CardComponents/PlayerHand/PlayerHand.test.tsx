import React from 'react';
import { render } from '@testing-library/react';
import PlayerHand from './PlayerHand';
import { convertCardToEnglish } from '../../../GameLogic/gameUtil';

describe('PlayerHand', () => {
  const hand = ['SC', 'EC', 'NC', 'JH', 'QH'];
  const mockOnClick = jest.fn();
  const mockSetSelected = jest.fn();
  const selectedCard = '';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the correct number of cards', () => {
    const { container } = render(
      <PlayerHand
        hasCardToPlay={false}
        selectedCard={selectedCard}
        setSelectedCard={mockSetSelected}
        hand={hand}
      />
    );
    const cardElements = container.querySelectorAll('.card');
    expect(cardElements.length).toBe(hand.length);
  });

  it('renders the cards correctly', () => {
    const { container } = render(
      <PlayerHand
        hasCardToPlay={false}
        selectedCard={selectedCard}
        setSelectedCard={mockSetSelected}
        hand={hand}
      />
    );
    const cardElements = container.querySelectorAll('.card');
    cardElements.forEach((cardElement, index) => {
      const cardString = convertCardToEnglish(hand[index]);
      expect(cardElement).toHaveAttribute('title', cardString);
    });
  });
});
