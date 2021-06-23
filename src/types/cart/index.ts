import { ProductType } from '../products';

export type CartType = {
    products: Array<ProductType>
    amount: number;
    discount: number;
    subtotal: number;
}

export type CartContextType = {
  cart: CartType;
  addToCart: (item: ProductType) => void;
  removeFromCart: (item: ProductType) => void;
  clearCart: () => void;
}
