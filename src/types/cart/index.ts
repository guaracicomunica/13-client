import { ProductInfoCartType } from '../products';

export type CartProductListType = {
  id: number;
  quantity: number;
  price: number;
  size_id: number;
}

export type CartContextType = {
  cartProductList: CartProductListType[];
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
