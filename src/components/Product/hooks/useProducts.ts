import { useState, useEffect } from 'react';
import { Product } from '../type';

const ITEMS_PER_PAGE = 12;

export const useProducts = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://equalexperts.github.io/frontend-take-home-test-data/products.json');
        
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data)) {
          throw new Error('Invalid product data format received');
        }
        
        const validProducts = data.filter(product => 
          product && 
          typeof product.id === 'number' && 
          typeof product.title === 'string' && 
          typeof product.price === 'number' &&
          product.price > 0
        );
        
        if (validProducts.length === 0) {
          throw new Error('No valid products found in the data');
        }
        
        setAllProducts(validProducts);
        const firstPage = validProducts.slice(0, ITEMS_PER_PAGE);
        setDisplayedProducts(firstPage);
        setHasMore(validProducts.length > ITEMS_PER_PAGE);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred while loading products');
        setAllProducts([]);
        setDisplayedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    
    const newProducts = allProducts.slice(startIndex, endIndex);
    
    if (newProducts.length > 0) {
      setDisplayedProducts(prev => [...prev, ...newProducts]);
      setCurrentPage(nextPage);
      setHasMore(endIndex < allProducts.length);
    } else {
      setHasMore(false);
    }
    
    setLoadingMore(false);
  };

  const retryFetch = () => {
    setError(null);
    setLoading(true);
    setCurrentPage(1);
    setDisplayedProducts([]);
    setHasMore(true);
    window.location.reload();
  };

  return { 
    products: displayedProducts, 
    loading, 
    loadingMore,
    error, 
    hasMore,
    retryFetch, 
    loadMore,
    totalProducts: allProducts.length 
  };
};