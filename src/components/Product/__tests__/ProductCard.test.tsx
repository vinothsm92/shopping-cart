import { render, screen, fireEvent } from '@testing-library/react';
import { ProductCard } from '../ProductCard';
import { CartProvider } from '../../../context/CartContext';
import { Product } from '../types/product';

const renderWithProvider = (product: Product) => {
  return render(
    <CartProvider>
      <ProductCard product={product} />
    </CartProvider>
  );
};

const baseProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 29.99,
  description: 'This is a test product description',
  category: 'test',
  image: 'https://via.placeholder.com/150',
  rating: {
    rate: 4.5,
    count: 120
  }
};

describe('ProductCard', () => {
  it('renders product information correctly', () => {
    renderWithProvider(baseProduct);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('$29.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByText('4.5 (120)')).toBeInTheDocument();
  });

  it('has accessible add to cart button', () => {
    renderWithProvider(baseProduct);

    const button = screen.getByRole('button', { name: /add test product to cart/i });
    expect(button).toBeInTheDocument();
  });

  it('clicking add to cart does not throw for valid product', () => {
    renderWithProvider(baseProduct);

    const button = screen.getByRole('button', { name: /add test product to cart/i });
    fireEvent.click(button);

    expect(button).toBeEnabled();
  });

  it('shows fallback for missing product', () => {
    const brokenProduct = { ...baseProduct, id: undefined as unknown as number };

    renderWithProvider(brokenProduct);

    expect(screen.getByText(/product unavailable/i)).toBeInTheDocument();
  });

  it('renders "Price unavailable" if price is invalid', () => {
    const invalidPriceProduct = { ...baseProduct, price: NaN };

    renderWithProvider(invalidPriceProduct);

    expect(screen.getByText(/price unavailable/i)).toBeInTheDocument();
  });

  it('disables "Add to Cart" button when price is 0', () => {
    const freeProduct = { ...baseProduct, price: 0 };

    renderWithProvider(freeProduct);

    const button = screen.getByRole('button', { name: /add test product to cart/i });
    expect(button).toBeDisabled();
  });

  it('uses fallback image on error', () => {
    renderWithProvider(baseProduct);

    const image = screen.getByRole('img') as HTMLImageElement;

    fireEvent.error(image);

    expect(image.src).toContain('https://via.placeholder.com/300x300');
  });

  it('renders placeholder description if missing', () => {
    const noDesc = { ...baseProduct, description: '' };

    renderWithProvider(noDesc);

    expect(screen.getByText(/no description available/i)).toBeInTheDocument();
  });

  it('renders placeholder title if missing', () => {
    const noTitle = { ...baseProduct, title: '' };

    renderWithProvider(noTitle);

    expect(screen.getByLabelText(/add product to cart/i)).toBeInTheDocument();
  });
});
