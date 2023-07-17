import React from 'react';
import { render } from '@testing-library/react';
import TrickPile from './TrickPile';
import { convertCardToEnglish } from '../../GameLogic/gameUtil';

describe('TrickPile', () => {
  const cards = ['SC', 'EC', 'NC', 'JH', 'QH'];

  it('renders the correct number of cards', () => {
    const { container } = render(<TrickPile cards={cards} />);
    const cardElements = container.querySelectorAll('.card');
    expect(cardElements.length).toBe(cards.length);
  });

  it('renders the cards correctly', () => {
    const { container } = render(<TrickPile cards={cards} />);
    const cardElements = container.querySelectorAll('.card');
    cardElements.forEach((cardElement, index) => {
      const cardValue = cardElement.textContent;
      const convertedCard = convertCardToEnglish(cards[index]);
      expect(cardValue).toBe(convertedCard);
    });
  });
});
