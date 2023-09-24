import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import InputBox from './InputBox';
// import useWebSocket from '../../Hooks/useWebSocket';

// Mock the useWebSocket hook
// jest.mock('../../Hooks/useWebSocket');

describe('InputBox', () => {
  const mockSendMessage = jest.fn();

  // beforeEach(() => {
  //   useWebSocket.mockReturnValue({
  //     sendMessage: mockSendMessage
  //   });
  // });

  it('renders the input box component', () => {
    const { getByTestId } = render(<InputBox />);
    const inputBoxComponent = getByTestId('inputbox-test');
    expect(inputBoxComponent).toBeInTheDocument();
  });

  it('updates the user input on change', () => {
    const { getByTestId } = render(<InputBox />);
    const inputBox = getByTestId('inputbox-test') as HTMLInputElement;
    fireEvent.change(inputBox, { target: { value: 'Test message' } });
    expect(inputBox.value).toBe('Test message');
  });

  // it('calls onSubmit when Enter key is pressed', () => {
  //   const { getByTestId } = render(<InputBox />);
  //   const inputBox = getByTestId('inputbox-test');
  //   fireEvent.change(inputBox, { target: { value: 'Test message' } });
  //   fireEvent.keyDown(inputBox, { key: 'Enter', code: 'Enter' });
  //   expect(mockSendMessage).toHaveBeenCalledTimes(1);
  // });

  // it('calls onSubmit when send button is clicked', () => {
  //   const { getByTestId } = render(<InputBox />);
  //   const inputBox = getByTestId('inputbox-test');
  //   fireEvent.change(inputBox, { target: { value: 'Test message' } });
  //   const sendButton = getByTestId('send-button-test');
  //   fireEvent.click(sendButton);
  //   expect(mockSendMessage).toHaveBeenCalledTimes(1);
  // });
});
