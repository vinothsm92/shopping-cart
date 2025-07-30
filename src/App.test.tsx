import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
  it('renders header, featured products section, and product list', () => {
    render(<App />);

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByText(/featured products/i)).toBeInTheDocument();

    expect(screen.getByText(/discover our amazing collection of products/i)).toBeInTheDocument();

  });

  it('does not show the cart initially', () => {
    render(<App />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });
});
