import { ProductInfoCartType } from '../products';

export type CartProductType = {
  id: number;
  quantity: number;
  price: number;
  product_id: number;
  product_size_id: number;
}

export type CartContextType = {
  cartProductList: CartProductType[];
  productInfoList: ProductInfoCartType[];
  amount: number;
  discount: number;
  subtotal: number;
  userId: number;
  cartId: number;
  totalQuantity: number;
  loadProductInformation: (cartId: number) => void;
  calculatePurchase: () => void;
  calculateTotalProductQuantity: () => void;
  increaseProductQuantity: (idProduct: number) => void;
  decreaseProductQuantity: (idProduct: number) => void;
  selectProductSize: (idProductCart: number, idProductSize: number, idSize: number) => void;
  addToCart: (cartId: number, idProduct: number, idProductSize?: number) => void;
  removeFromCart: (idProduct: number) => void;
  clearCart: () => void;
}
