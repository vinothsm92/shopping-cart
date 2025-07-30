import React from 'react';
import { ShoppingCart, Store } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Header: React.FC = () => {
  const { state, toggleCart } = useCart();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Store className="h-8 w-8 text-blue-600 mr-2" />
            <h1 className="text-xl font-bold text-gray-900">
              Product Store
            </h1>
          </div>
          
          <button
            onClick={toggleCart}
            className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`View cart with ${state.itemCount} items`}
          >
            <ShoppingCart className="h-6 w-6" />
            {state.itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {state.itemCount > 99 ? '99+' : state.itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};