import React from 'react';
import { render } from '@testing-library/react';
import ChatContainer from './ChatContainer';
import { MessageBody } from '../../../types';

describe('ChatContainer', () => {
  const mockChatFeed: MessageBody[] = [];
  const mockSendMessage = jest.fn();

  it('renders the chat container component', () => {
    const { getByTestId } = render(
      <ChatContainer chatFeed={mockChatFeed} send={mockSendMessage} />
    );
    const chatContainer = getByTestId('chat-container-test');
    expect(chatContainer).toBeInTheDocument();
  });

  it('renders MessageContainer component', () => {
    const { getByTestId } = render(
      <ChatContainer chatFeed={mockChatFeed} send={mockSendMessage} />
    );
    const messageContainer = getByTestId('message-container-test');
    expect(messageContainer).toBeInTheDocument();
  });

  it('renders InputBox component', () => {
    const { getByTestId } = render(
      <ChatContainer chatFeed={mockChatFeed} send={mockSendMessage} />
    );
    const inputBox = getByTestId('inputbox-test');
    expect(inputBox).toBeInTheDocument();
  });
});
