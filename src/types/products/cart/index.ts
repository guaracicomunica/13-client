export type CartType = {
    products: Array<Product>
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
