import { render } from '@testing-library/react';
import MessageContainer from './MessageContainer';
import { ChatFeed } from '../../../types';

const chatFeedMock: ChatFeed = [
  { name: 'John', content: 'Hello', time: '09:16' },
  { name: 'Brian', content: 'Hi!', time: '12:45' }
];

describe('MessageContainer', () => {
  it('renders the message container component', () => {
    const { getByTestId } = render(
      <MessageContainer chatFeed={chatFeedMock} />
    );

    const messageContainer = getByTestId('message-container-test');
    expect(messageContainer).toBeInTheDocument();
  });

  it('renders messages correctly', () => {
    const { getByText } = render(<MessageContainer chatFeed={chatFeedMock} />);

    const messageContent = getByText('Hello');
    expect(messageContent).toBeInTheDocument();
  });
});
