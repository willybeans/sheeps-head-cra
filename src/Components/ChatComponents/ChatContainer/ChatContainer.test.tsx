import React from 'react';
import { render } from '@testing-library/react';
import ChatContainer from './ChatContainer';

describe('ChatContainer', () => {
  it('renders the chat container component', () => {
    const { getByTestId } = render(<ChatContainer />);
    const chatContainer = getByTestId('chat-container-test');
    expect(chatContainer).toBeInTheDocument();
  });

  it('renders MessageContainer component', () => {
    const { getByTestId } = render(<ChatContainer />);
    const messageContainer = getByTestId('message-container-test');
    expect(messageContainer).toBeInTheDocument();
  });

  it('renders InputBox component', () => {
    const { getByTestId } = render(<ChatContainer />);
    const inputBox = getByTestId('inputbox-test');
    expect(inputBox).toBeInTheDocument();
  });
});
