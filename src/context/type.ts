import { Product } from "../components/Product/type";

  
  export interface CartItem {
    product: Product;
    quantity: number;
  }
  
  export interface CartState {
    items: CartItem[];
    isOpen: boolean;
    total: number;
    itemCount: number;
  }
  
  export type CartAction =
    | { type: 'ADD_ITEM'; payload: Product }
    | { type: 'REMOVE_ITEM'; payload: number }
    | { type: 'UPDATE_QUANTITY'; payload: { id: number; quantity: number } }
    | { type: 'CLEAR_CART' }
    | { type: 'TOGGLE_CART' };