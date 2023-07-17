import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  const mockOnClick = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders card with suit and value', () => {
    const { getByText } = render(<Card cardClick={mockOnClick} card="AD" />);
    expect(getByText('ace diamonds')).toBeInTheDocument();
  });

  it('applies suit class based on the suit prop', () => {
    const { container } = render(<Card cardClick={mockOnClick} card="KS" />);
    const spans = container.querySelectorAll('span');
    expect(spans[0]).toHaveClass('suit spades');
  });

  it('invokes onClick callback when clicked', () => {
    const { container } = render(<Card card="QH" cardClick={mockOnClick} />);
    fireEvent.click(container.firstChild!);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
