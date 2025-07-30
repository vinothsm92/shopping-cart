import React from 'react';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '../CartContext';
import { Product } from '../../components/Product/type';


const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  price: 100,
  image: 'https://example.com/image.jpg',
  description: 'Test description',
  category: 'Test category',
  rating: { rate: 4.5, count: 100 }
};

describe('CartContext', () => {
  it('adds item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
    });

    expect(result.current.state.items.length).toBe(1);
    expect(result.current.state.total).toBe(100);
    expect(result.current.state.itemCount).toBe(1);
  });

  it('removes item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.removeItem(mockProduct.id);
    });

    expect(result.current.state.items.length).toBe(0);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.itemCount).toBe(0);
  });

  it('updates quantity of an item', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.updateQuantity(mockProduct.id, 3);
    });

    expect(result.current.state.items[0].quantity).toBe(3);
    expect(result.current.state.total).toBe(300);
    expect(result.current.state.itemCount).toBe(3);
  });

  it('clears the cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockProduct);
      result.current.clearCart();
    });

    expect(result.current.state.items.length).toBe(0);
    expect(result.current.state.total).toBe(0);
    expect(result.current.state.itemCount).toBe(0);
  });

  it('toggles cart visibility', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.state.isOpen).toBe(false);
    act(() => result.current.toggleCart());
    expect(result.current.state.isOpen).toBe(true);
    act(() => result.current.toggleCart());
    expect(result.current.state.isOpen).toBe(false);
  });

  it('does not add product with invalid price', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const invalidProduct = { ...mockProduct, price: -100 };
    act(() => {
      result.current.addItem(invalidProduct);
    });

    expect(result.current.state.items.length).toBe(0);
  });
});
