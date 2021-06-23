import { createContext, useState } from 'react';

type Product = {
    id: number;
    name: string;
    price: number;
}

type Cart = {
    products: Array<Product>
    amount: number;
    discount: number;
    subtotal: number;
}

type CartContextType = {
  cart: Cart;
  addToCart: (item: Product) => void;
  removeFromCart: (item: Product) => void;
  clearCart: () => void;
}

const initialState = {products: [{id: 1, name: 'produto 01', price: 50.5}], amount: 0, subtotal: 0, discount: 0} as Cart

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) =>
{
    const [cart, setCart] = useState<Cart>(initialState);

    function addToCart(item)
    {
        cart.products = [...cart.products, item]
        setCart(cart);
    }

    function removeFromCart(item)
    {
        const filteredItems = cart.products.filter(
            product => product.id !== item.id
        );

        carts.products = [...filteredItems];

        setCart(cart);
    }

    function clearCart()
    {
        setCart(initialState);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}