import { CartProvider } from './context/CartContext';
import { Header } from './components/Common/Header';
import { ProductList } from './components/Product/ProductList';
import { Cart } from './components/Cart/Cart';

function App() {

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header 
        />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-gray-600 mt-2">Discover our amazing collection of products</p>
            </div>
            <ProductList />
          </div>
        </main>
        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;