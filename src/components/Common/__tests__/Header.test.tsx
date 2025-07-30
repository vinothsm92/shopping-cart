import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '../Header';
import * as CartContext from '../../../context/CartContext';

describe('Header', () => {
  const toggleCartMock = jest.fn();
  const mockFn = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });


  function setupMock(itemCount: number) {
    jest.spyOn(CartContext, 'useCart').mockReturnValue({
      state: {
        itemCount,
        items: [],
        isOpen: false,
        total: 0,
      },
      toggleCart: toggleCartMock,
      dispatch: mockFn,
      addItem: mockFn,
      removeItem: mockFn,
      updateQuantity: mockFn,
      clearCart: mockFn,
    });
  }
  
  

  it('renders store title and icons', () => {
    setupMock(0);
    render(<Header />);
    expect(screen.getByText(/Product Store/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/view cart with 0 items/i)).toBeInTheDocument();
  });

  it('does not render item count badge if itemCount is 0', () => {
    setupMock(0);
    render(<Header />);
    const badge = screen.queryByText(/0/);
    expect(badge).not.toBeInTheDocument();
  });

  it('renders item count badge correctly when itemCount is less than 100', () => {
    setupMock(42);
    render(<Header />);
    expect(screen.getByText('42')).toBeInTheDocument();
    expect(screen.getByLabelText(/view cart with 42 items/i)).toBeInTheDocument();
  });

  it('renders "99+" when itemCount is greater than 99', () => {
    setupMock(120);
    render(<Header />);
    expect(screen.getByText('99+')).toBeInTheDocument();
    expect(screen.getByLabelText(/view cart with 120 items/i)).toBeInTheDocument();
  });

  it('calls toggleCart when cart button is clicked', () => {
    setupMock(5);
    render(<Header />);
    const button = screen.getByRole('button', { name: /view cart with 5 items/i });
    fireEvent.click(button);
    expect(toggleCartMock).toHaveBeenCalledTimes(1);
  });
});
