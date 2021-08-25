import { ProductCartType } from '../products';

export type CartType = {
  products: ProductCartType[];
  amount: number;
  discount: number;
  subtotal: number;
}

export type CartContextType = {
  cart: CartType;
  addToCart: (item: ProductCartType) => void;
  removeFromCart: (idProduct: number) => void;
  clearCart: () => void;
}
