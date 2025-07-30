import { render, screen } from '@testing-library/react';
import { LoadingSpinner } from '../LoadingSpinner';

describe('LoadingSpinner', () => {
  it('renders with default props', () => {
    render(<LoadingSpinner />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveAttribute('aria-label', 'Loading products...');

    const texts = screen.getAllByText(/loading products.../i);
    expect(texts.length).toBe(2);

    const visibleText = texts.find(el => el.tagName.toLowerCase() === 'p');
    expect(visibleText).toBeInTheDocument();
    expect(visibleText).toHaveClass('mt-4 text-gray-600 text-sm');

    const spinnerDiv = spinner.querySelector('div');
    expect(spinnerDiv).toHaveClass('animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600');
  });

  it('renders with size sm without visible text', () => {
    render(<LoadingSpinner size="sm" />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('aria-label', 'Loading products...');

    const paragraphs = screen.queryAllByText(/loading products.../i, { selector: 'p' });
    expect(paragraphs.length).toBe(0);

    const srOnlyText = screen.getByText(/loading products.../i, { selector: 'span.sr-only' });
    expect(srOnlyText).toBeInTheDocument();

    const spinnerDiv = spinner.querySelector('div');
    expect(spinnerDiv).toHaveClass('h-6 w-6');
  });

  it('renders with size lg and custom text', () => {
    const customText = 'Please wait...';
    render(<LoadingSpinner size="lg" text={customText} />);
    const spinner = screen.getByTestId('loading-spinner');
    expect(spinner).toHaveAttribute('aria-label', customText);

    const texts = screen.getAllByText(customText);
    expect(texts.length).toBe(2);

    const visibleText = texts.find(el => el.tagName.toLowerCase() === 'p');
    expect(visibleText).toBeInTheDocument();

    const spinnerDiv = spinner.querySelector('div');
    expect(spinnerDiv).toHaveClass('h-16 w-16');
  });
});
