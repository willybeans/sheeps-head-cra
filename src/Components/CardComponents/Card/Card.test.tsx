import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  const mockCard = 'AH'; // Ace of Hearts
  const mockCardClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the card component', () => {
    const { getByTestId } = render(<Card card={mockCard} />);
    const cardComponent = getByTestId('card-test');
    expect(cardComponent).toBeInTheDocument();
  });

  it('applies the "back" style when the card prop is "BACK"', () => {
    const { getByTestId } = render(<Card card="BACK" />);
    const cardComponent = getByTestId('card-test');
    expect(cardComponent).toHaveClass('back');
  });

  it('displays the correct title for a face-down card', () => {
    const { getByTestId } = render(<Card card="BACK" />);
    const cardComponent = getByTestId('card-test');
    expect(cardComponent).toHaveAttribute('title', 'Back of Card');
  });

  it('displays the correct title for a face-up card', () => {
    const { getByTestId } = render(<Card card={mockCard} />);
    const cardComponent = getByTestId('card-test');
    expect(cardComponent).toHaveAttribute('title', 'ace of hearts');
  });

  it('calls the cardClick function when clicked', () => {
    const { getByTestId } = render(
      <Card card={mockCard} cardClick={mockCardClick} />
    );
    const cardComponent = getByTestId('card-test');
    fireEvent.click(cardComponent);
    expect(mockCardClick).toHaveBeenCalledWith(mockCard);
  });

  it('renders the card image', () => {
    const { getByTestId } = render(<Card card={mockCard} />);
    const cardImage = getByTestId('card-test').querySelector('img');
    expect(cardImage).toBeInTheDocument();
  });
});
