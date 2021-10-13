import { ProductInfoCartType } from '../products';

export type CartType = {
  products: CartProductsListType[];
  amount: number;
  discount: number;
  subtotal: number;
  user_id: number;
  cart_id: number;
  total_quantity: number;
}

export type CartProductsListType = {
  id: number;
  quantity: number;
  price: number;
  size_id: number;
}

export type CartContextType = {
  cartProducts: CartProductsListType[];
  productInfoList: ProductInfoCartType[];
  amount: number;
  discount: number;
  subtotal: number;
  userId: number;
  cartId: number;
  totalQuantity: number;
  calculatePurchase: () => void;
  calculateTotalProductQuantity: () => void;
  increaseProductQuantity: (idProduct: number) => void;
  decreaseProductQuantity: (idProduct: number) => void;
  addToCart: (item: ProductInfoCartType) => void;
  removeFromCart: (idProduct: number) => void;
  clearCart: () => void;
}
