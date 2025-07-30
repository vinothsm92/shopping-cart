import React from 'react';
import { ProductCard } from './ProductCard';
import { LoadingSpinner } from '../Common/LoadingSpinner';
import { ErrorMessage } from '../Common/ErrorMessage';
import { useProducts } from './hooks/useProducts';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll';

export const ProductList: React.FC = () => {
  const { products, loading, loadingMore, error, hasMore, retryFetch, loadMore } = useProducts();
  
  const { loadingRef } = useInfiniteScroll({
    hasMore,
    loading: loadingMore,
    onLoadMore: loadMore,
    threshold: 200
  });

  if (loading) {
    return <LoadingSpinner size="lg" text="Loading products..." />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={retryFetch} />;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12" data-testid="no-products">
        <p className="text-gray-500 text-lg">No products available</p>
      </div>
    );
  }

  return (
    <section className="py-8" aria-label="Product listings" aria-live="polite">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center py-8">
          {loadingMore && (
            <LoadingSpinner size="sm" text="Loading more products..." />
          )}
        </div>
      )}
      
      {!hasMore && products.length > 0 && (
        <div className="text-center py-8" data-testid="end-of-list">
          <p className="text-gray-500 text-sm">
            You've reached the end! Showing all {products.length} products.
          </p>
        </div>
      )}
    </section>
  );
};