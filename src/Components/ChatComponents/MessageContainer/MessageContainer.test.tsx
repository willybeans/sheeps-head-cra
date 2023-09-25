import { render } from '@testing-library/react';
import MessageContainer from './MessageContainer';
import receivedMessages from '../../Hooks/useWebSocket';

jest.mock('../../Hooks/useWebSocket', () => ({
  __esModule: true,
  default: jest.fn()
}));

describe('MessageContainer', () => {
  const mockUseWebSocket = receivedMessages as jest.Mock;

  it('renders the message container component', () => {
    mockUseWebSocket.mockReturnValue({
      receivedMessages: [
        { name: 'John', content: 'Hello', time: '1632767888000' }
        // Add more mock messages as needed
      ]
    });

    const { getByTestId } = render(<MessageContainer />);

    const messageContainer = getByTestId('message-container-test');
    expect(messageContainer).toBeInTheDocument();
  });

  it('renders messages correctly', () => {
    mockUseWebSocket.mockReturnValue({
      receivedMessages: [{ name: 'John', content: 'Hello', time: '12:34' }]
    });

    const { getByText } = render(<MessageContainer />);

    const messageContent = getByText('Hello');
    expect(messageContent).toBeInTheDocument();
  });
});
