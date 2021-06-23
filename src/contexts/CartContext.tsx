import { createContext, useState } from 'react';
import { CartType, CartContextType } from '../types/cart';

const initialState = {products: [{id: 1, name: 'produto 01', price: 50.5}], amount: 0, subtotal: 0, discount: 0} as CartType

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) =>
{
    const [cart, setCart] = useState<CartType>(initialState);

    function addToCart(item)
    {
        const filteredItems = [...cart.products, item]
        setCart({products:  [...filteredItems], amount: 0, subtotal: 0, discount: 0});
        console.log('add to cart:', cart);
    }

    function removeFromCart(item)
    {
        const filteredItems = cart.products.filter(
            product => product.id !== item.id
        );

        setCart({products:  [...filteredItems], amount: 0, subtotal: 0, discount: 0});
        console.log('remove from cart:', cart);
    }

    function clearCart()
    {
        setCart({products: [], amount: 0, subtotal: 0, discount: 0});
        console.log('clear cart:', cart);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}