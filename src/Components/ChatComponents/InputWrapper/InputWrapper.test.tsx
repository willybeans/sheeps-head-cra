import { render, fireEvent } from '@testing-library/react';
import InputWrapper from './InputWrapper';

describe('InputWrapper', () => {
  it('renders the input wrapper component', () => {
    const { getByTestId } = render(
      <InputWrapper
        userInputRef={null}
        onInput={() => {}}
        keyPress={() => {}}
      />
    );

    const inputBox = getByTestId('inputbox-test');
    expect(inputBox).toBeInTheDocument();
  });

  it('calls onInput when input changes', () => {
    const onInputMock = jest.fn();
    const { getByTestId } = render(
      <InputWrapper
        userInputRef={null}
        onInput={onInputMock}
        keyPress={() => {}}
      />
    );

    const inputBox = getByTestId('inputbox-test');
    fireEvent.change(inputBox, { target: { value: 'test message' } });

    expect(onInputMock).toHaveBeenCalled();
  });

  it('calls keyPress when Enter is pressed', () => {
    const keyPressMock = jest.fn();
    const { getByTestId } = render(
      <InputWrapper
        userInputRef={null}
        onInput={() => {}}
        keyPress={keyPressMock}
      />
    );

    const inputBox = getByTestId('inputbox-test');
    fireEvent.keyDown(inputBox, { key: 'Enter', code: 'Enter' });

    expect(keyPressMock).toHaveBeenCalled();
  });
});
