import React from 'react';
import { render } from '@testing-library/react';
import UserSeat from './UserSeat';
import { Player, TableCard } from '../../../types';

describe('UserSeat', () => {
  const mockPlayer: Player = {
    id: 'player1',
    hand: ['A♠', 'K♥', 'Q♣'],
    score: 0,
    onSecretTeam: false,
    wonCardsTotal: 10,
    isPicker: false,
    wonCards: [],
    cardToPlay: {} as TableCard
  };

  it('renders player ID and cards in hand', () => {
    const { getByText, getAllByTestId } = render(<UserSeat {...mockPlayer} />);

    const playerIdElement = getByText('player1');
    const cardElements = getAllByTestId('card-test');

    expect(playerIdElement).toBeInTheDocument();
    expect(cardElements.length).toBe(3);
  });

  it('renders an image', () => {
    const { getByAltText } = render(<UserSeat {...mockPlayer} />);

    const imageElement = getByAltText('Sheep');

    expect(imageElement).toBeInTheDocument();
  });

  it('renders card components with "BACK" card', () => {
    const { getAllByText } = render(<UserSeat {...mockPlayer} />);

    const backCardElements = getAllByText('Back of Card');

    expect(backCardElements.length).toBe(3);
  });
});
