import { render } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  const messageData = {
    name: 'John',
    content: 'Hello, how are you?',
    time: '12:45'
  };

  it('renders the message component', () => {
    const { getByTestId } = render(<Message {...messageData} />);
    const messageComponent = getByTestId('message-test');
    expect(messageComponent).toBeInTheDocument();
  });

  it('displays the correct message content', () => {
    const { getByText } = render(<Message {...messageData} />);
    const messageContent = getByText(messageData.content);
    expect(messageContent).toBeInTheDocument();
  });

  it('displays the correct sender name', () => {
    const { container } = render(<Message {...messageData} />);
    const span = container.querySelectorAll(
      'span'
    ) as NodeListOf<HTMLSpanElement>;
    expect(span[1].textContent).toEqual(messageData.name + ' : ');
  });

  it('displays the correct timestamp', () => {
    const { getByText } = render(<Message {...messageData} />);
    const timestamp = getByText(`[${messageData.time}]`);
    expect(timestamp).toBeInTheDocument();
  });
});
