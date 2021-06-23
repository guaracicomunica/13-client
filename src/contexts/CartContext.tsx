import { createContext, useState } from 'react';
import { CartType, CartContextType } from '../types/cart';

const initialState = {products: [], amount: 0, subtotal: 0, discount: 0} as CartType

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) =>
{
    const [cart, setCart] = useState<CartType>(initialState);

    function addToCart(item)
    {
        cart.products = [...cart.products, item]
        setCart(cart);
        console.log('add to cart:', cart);
    }

    function removeFromCart(item)
    {
        const filteredItems = cart.products.filter(
            product => product.id !== item.id
        );

        cart.products = [...filteredItems];
        setCart(cart);
        console.log('remove from cart:', cart);
    }

    function clearCart()
    {
        setCart(initialState);
        console.log('clear cart:', cart);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}