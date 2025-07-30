import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorMessage } from '../ErrorMessage';

describe('ErrorMessage', () => {
  const errorText = 'Something went wrong';

  it('renders the error message text', () => {
    render(<ErrorMessage message={errorText} />);
    expect(screen.getByTestId('error-message')).toBeInTheDocument();
    expect(screen.getByTestId('error-message')).toHaveTextContent(errorText);
  });

  it('does NOT render the retry button if onRetry is not provided', () => {
    render(<ErrorMessage message={errorText} />);
    const button = screen.queryByTestId('try-again-button');
    expect(button).not.toBeInTheDocument();
  });

  it('renders the retry button if onRetry is provided', () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message={errorText} onRetry={mockRetry} />);
    const button = screen.getByTestId('try-again-button');
    expect(button).toBeInTheDocument();
  });

  it('calls onRetry when the retry button is clicked', () => {
    const mockRetry = jest.fn();
    render(<ErrorMessage message={errorText} onRetry={mockRetry} />);
    const button = screen.getByTestId('try-again-button');

    fireEvent.click(button);
    expect(mockRetry).toHaveBeenCalledTimes(1);
  });
});
