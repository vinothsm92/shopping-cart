import { render, screen } from '@testing-library/react';
import { ProductList } from '../ProductList';
import { CartProvider } from '../../../context/CartContext';

jest.mock('../hooks/useProducts');
jest.mock('../../../hooks/useInfiniteScroll');

import { useProducts } from '../hooks/useProducts';
import { useInfiniteScroll } from '../../../hooks/useInfiniteScroll';

const mockUseProducts = useProducts as jest.Mock;
const mockUseInfiniteScroll = useInfiniteScroll as jest.Mock;

// Shared mock product data
const mockProducts = [
  {
    id: 1,
    title: 'Mock Product',
    price: 29.99,
    image: 'https://example.com/image.png',
    description: 'A sample product',
    category: 'Mock Category',
    rating: { rate: 4.5, count: 100 }
  }
];

// Default mock hook return values
const defaultProductHookValues = {
  products: mockProducts,
  loading: false,
  loadingMore: false,
  error: null,
  hasMore: false,
  retryFetch: jest.fn(),
  loadMore: jest.fn()
};

const defaultInfiniteScrollHookValues = {
  loadingRef: { current: null }
};

// Utility to wrap ProductList with required providers
const renderWithCartProvider = () =>
  render(
    <CartProvider>
      <ProductList />
    </CartProvider>
  );

describe('ProductList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseInfiniteScroll.mockReturnValue(defaultInfiniteScrollHookValues);
  });

  it('renders loading spinner when loading', () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductHookValues,
      loading: true,
      products: []
    });

    renderWithCartProvider();

    expect(screen.getByRole('status')).toBeInTheDocument();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it('renders error message when error occurs', () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductHookValues,
      error: 'Fetch failed',
      products: []
    });

    renderWithCartProvider();
    expect(screen.getByText(/fetch failed/i)).toBeInTheDocument();
  });

  it('renders message when no products are available', () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductHookValues,
      products: []
    });

    renderWithCartProvider();
    expect(screen.getByTestId('no-products')).toBeInTheDocument();
  });

  it('renders product list when products are available', () => {
    mockUseProducts.mockReturnValue(defaultProductHookValues);

    renderWithCartProvider();
    expect(screen.getByText(/mock product/i)).toBeInTheDocument();
  });

  it('renders loading more spinner if hasMore and loadingMore is true', () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductHookValues,
      hasMore: true,
      loadingMore: true
    });

    renderWithCartProvider();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  it("shows 'end of list' message when no more products to load", () => {
    mockUseProducts.mockReturnValue({
      ...defaultProductHookValues,
      hasMore: false
    });

    renderWithCartProvider();
    expect(screen.getByTestId('end-of-list')).toBeInTheDocument();
  });
});
