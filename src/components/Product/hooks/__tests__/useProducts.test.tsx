import { renderHook, waitFor } from '@testing-library/react';
import { useProducts } from '../useProducts';

global.fetch = jest.fn();

describe('useProducts', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch products successfully', async () => {
    const mockProducts = [
      { id: 1, title: 'Product 1', price: 10.99 },
      { id: 2, title: 'Product 2', price: 20.99 }
    ];

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);
    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe(null);
    expect(result.current.hasMore).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(2);
    expect(result.current.error).toBe(null);
    expect(result.current.totalProducts).toBe(2);
  });

  it('should handle fetch errors', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useProducts());

    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toEqual([]);
    expect(result.current.error).toBe('Network error');
    expect(result.current.hasMore).toBe(true);
  });

  it('should load more products when loadMore is called', async () => {
    const mockProducts = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      description: `Description ${i + 1}`,
      price: 10 + i
    }));

    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });

    const { result } = renderHook(() => useProducts());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.products).toHaveLength(12);
    expect(result.current.hasMore).toBe(true);

    await result.current.loadMore();

    await waitFor(() => {
      expect(result.current.loadingMore).toBe(false);
    });

    expect(result.current.products).toHaveLength(24);
    expect(result.current.hasMore).toBe(true);
  });

  it('should not load more if loadingMore is true or no more products', async () => {
    const mockProducts = Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      title: `Product ${i + 1}`,
      price: 10 + i,
    }));
  
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockProducts,
    });
  
    const { result } = renderHook(() => useProducts());
  
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });
  
    result.current.loadMore();
  
    await waitFor(() => {
      expect(result.current.loadingMore).toBe(false);
    });
  
    expect(result.current.hasMore).toBe(false);
  
    await result.current.loadMore();
    expect(result.current.loadingMore).toBe(false);
  });
  
});