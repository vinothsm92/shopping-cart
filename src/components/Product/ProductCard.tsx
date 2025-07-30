import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { Product } from './type';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (!product || !product.id || !product.title || typeof product.price !== 'number' || product.price <= 0) {
      console.error('Invalid product data:', product);
      return;
    }
    
    addItem(product);
  };

  const formatPrice = (price: number) => {
    if (typeof price !== 'number' || isNaN(price)) {
      return 'Price unavailable';
    }
    
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  if (!product || !product.id) {
    return (
      <div className="bg-gray-100 rounded-lg p-4 text-center">
        <p className="text-gray-500">Product unavailable</p>
      </div>
    );
  }

  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200 fade-in">
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <img
          src={product.image || '/placeholder-image.jpg'}
          alt={product.title || 'Product image'}
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x300?text=Image+Not+Available';
          }}
        />
      </div>
      
      <div className="p-4 space-y-3">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 leading-tight">
            {product.title || 'Untitled Product'}
          </h3>
          
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            
            {product.rating && typeof product.rating.rate === 'number' && typeof product.rating.count === 'number' && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.floor(product.rating.rate)
                          ? 'text-yellow-400 fill-current'
                          : star === Math.floor(product.rating.rate) + 1 && product.rating.rate % 1 >= 0.5
                          ? 'text-yellow-400 fill-current opacity-50'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating.rate} ({product.rating.count})
                </span>
              </div>
            )}
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
          {product.description || 'No description available'}
        </p>

        <div className="pt-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.price || product.price <= 0}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label={`Add ${product.title || 'product'} to cart`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="font-medium">Add to Cart</span>
          </button>
        </div>
      </div>
    </article>
  );
};