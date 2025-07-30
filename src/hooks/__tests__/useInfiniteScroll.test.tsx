import React from 'react';
import { render, renderHook } from '@testing-library/react';

import { useInfiniteScroll } from '../useInfiniteScroll';

const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('useInfiniteScroll', () => {
  const mockOnLoadMore = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should create intersection observer', () => {
    // Test component using the hook and attaching loadingRef to a real div
    const TestComponent = () => {
      const { loadingRef } = useInfiniteScroll({
        hasMore: true,
        loading: false,
        onLoadMore: mockOnLoadMore,
      });

      return <div ref={loadingRef} data-testid="loading-div">Loading</div>;
    };

    render(<TestComponent />);

    // IntersectionObserver constructor should have been called once
    expect(mockIntersectionObserver).toHaveBeenCalled();
  });

  it('should return loadingRef', () => {
    // This test still uses renderHook to verify loadingRef is defined
    // This is fine as no DOM is needed here
    const { result } = renderHook(() =>
      useInfiniteScroll({
        hasMore: true,
        loading: false,
        onLoadMore: mockOnLoadMore,
      }),
    );

    expect(result.current.loadingRef).toBeDefined();
  });
});
