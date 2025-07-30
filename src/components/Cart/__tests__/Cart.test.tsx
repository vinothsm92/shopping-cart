import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from '../Cart';
import * as CartContext from '../../../context/CartContext';
import { Product } from '../../Product/type';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  image: 'https://example.com/image.jpg',
  description: 'A test product for unit testing.',
  category: 'electronics',
  rating: {
    rate: 4.5,
    count: 10
  }
};


const mockToggleCart = jest.fn();
const mockUpdateQuantity = jest.fn();
const mockRemoveItem = jest.fn();
const mockClearCart = jest.fn();

const setupCartMock = (overrides = {}) => {
  jest.spyOn(CartContext, 'useCart').mockReturnValue({
    state: {
      isOpen: true,
      itemCount: 1,
      total: 100,
      items: [
        {
          product: mockProduct,
          quantity: 1,
        },
      ],
      ...overrides,
    },
    toggleCart: mockToggleCart,
    updateQuantity: mockUpdateQuantity,
    removeItem: mockRemoveItem,
    clearCart: mockClearCart,
    dispatch: jest.fn(),
    addItem: jest.fn(),
  });
};

describe('Cart component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('does not render when cart is closed', () => {
    setupCartMock({ isOpen: false, items: [], itemCount: 0, total: 0 });
    render(<Cart />);
    expect(screen.queryByText(/shopping cart/i)).not.toBeInTheDocument();
  });

  it('renders empty cart message', () => {
    setupCartMock({ items: [], itemCount: 0, total: 0 });
    render(<Cart />);
    expect(screen.getByTestId('empty-cart')).toBeInTheDocument();
    expect(screen.getByTestId('add-products')).toBeInTheDocument();
  });

  it('renders cart items and total', () => {
    setupCartMock();
    render(<Cart />);
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getAllByText('$100.00').length).toBeGreaterThan(0);
    expect(screen.getByText(/shopping cart \(1\)/i)).toBeInTheDocument();
  });

  it('calls toggleCart when close button is clicked', () => {
    setupCartMock();
    render(<Cart />);


    fireEvent.click(screen.getByTestId('close-cart-button'));
    expect(mockToggleCart).toHaveBeenCalled();
  });

  it('calls updateQuantity on plus button', () => {
    setupCartMock();
    render(<Cart />);
    fireEvent.click(screen.getByTestId('increase-quantity'));
    expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 2);
  });

  it('does not allow decreasing quantity below 1', () => {
    setupCartMock();
    render(<Cart />);
    fireEvent.click(screen.getByTestId('decrease-quantity'));
    expect(mockUpdateQuantity).not.toHaveBeenCalledWith(1, 0);
  });

  it('calls removeItem when trash button is clicked', () => {
    setupCartMock();
    render(<Cart />);
    fireEvent.click(screen.getByTestId('remove-item'));
    expect(mockRemoveItem).toHaveBeenCalledWith(1);
  });

  it('calls clearCart when Clear Cart button is clicked', () => {
    setupCartMock();
    render(<Cart />);
    fireEvent.click(screen.getByTestId('clear-cart'));
    expect(mockClearCart).toHaveBeenCalled();
  });
});
