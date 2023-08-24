import { render } from '@testing-library/react';
import TrickPile from './TrickPile';
import { convertCardToEnglish } from '../../../GameLogic/gameUtil';

describe('TrickPile', () => {
  const cards = [
    { player: 'player1', card: 'AS' },
    { player: 'player2', card: 'SS' },
    { player: 'player3', card: 'ES' }
  ];

  it('renders the correct number of cards', () => {
    const { container } = render(<TrickPile cards={cards} />);
    const cardElements = container.querySelectorAll('.card');
    expect(cardElements.length).toBe(cards.length);
  });

  it('renders the cards correctly', () => {
    const { container } = render(<TrickPile cards={cards} />);
    const cardElements = container.querySelectorAll('.card');
    cardElements.forEach((cardElement, index) => {
      const cardValue = cardElement.getAttribute('title');
      const convertedCard = convertCardToEnglish(cards[index].card);
      expect(cardValue).toBe(convertedCard);
    });
  });
});
