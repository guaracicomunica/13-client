import { ProductCartType } from '../products';

export type CartType = {
  products: ProductCartType[];
  amount: number;
  discount: number;
  subtotal: number;
}

export type CartContextType = {
  cart: CartType;
  increaseProductQuantity: (idProduct: number) => void;
  decreaseProductQuantity: (idProduct: number) => void;
  addToCart: (item: ProductCartType) => void;
  removeFromCart: (idProduct: number) => void;
  clearCart: () => void;
}
