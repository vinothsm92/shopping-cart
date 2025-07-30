import React from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export const Cart: React.FC = () => {
  const { state, toggleCart, updateQuantity, removeItem, clearCart } = useCart();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const handleQuantityChange = (id: number, change: number) => {
    const item = state.items.find(item => item.product.id === id);
    if (item) {
      const newQuantity = item.quantity + change;
      if (newQuantity >= 1) {
        updateQuantity(id, newQuantity);
      }
    }
  };

  if (!state.isOpen) {
    return null;
  }

  return (
    <div data-testid="cart" className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-white w-full max-w-md h-full overflow-y-auto shadow-xl">
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900 flex items-center">
              <ShoppingCart className="h-5 w-5 mr-2" />
              Shopping Cart ({state.itemCount})
            </h2>
            <button
              data-testid="close-cart-button"
              onClick={toggleCart}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Close cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-4 flex-1">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p data-testid="empty-cart" className="text-gray-500 text-lg">Your cart is empty</p>
              <p data-testid="add-products" className="text-gray-400 text-sm">Add some products to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {state.items.map((item) => (
                  <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-16 h-16 object-contain bg-gray-100 rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                          {item.product.title}
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {formatPrice(item.product.price)}
                        </p>
                        
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-2">
                            <button
                              data-testid="decrease-quantity"
                              onClick={() => handleQuantityChange(item.product.id, -1)}
                              className="p-1 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-sm font-medium px-2 py-1 bg-gray-100 rounded-md min-w-[2rem] text-center">
                              {item.quantity}
                            </span>
                            <button
                              data-testid="increase-quantity"
                              onClick={() => handleQuantityChange(item.product.id, 1)}
                              className="p-1 hover:bg-gray-100 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                              aria-label="Increase quantity"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          
                          <button
                            data-testid="remove-item"
                            onClick={() => removeItem(item.product.id)}
                            className="p-1 text-red-500 hover:bg-red-50 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                            aria-label="Remove item from cart"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        
                        <div className="mt-2 text-right">
                          <span className="text-sm font-semibold text-gray-900">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatPrice(state.total)}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <button data-testid="checkout" className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                    Checkout
                  </button>
                  <button
                    data-testid="clear-cart"
                    onClick={clearCart}
                    className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};