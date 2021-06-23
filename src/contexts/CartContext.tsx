import { createContext, useState } from "react";

export const CartContext = createContext({});

export const CartProvider = ({ children }) =>
{
    const [cart, setCart] = useState();

    function addToCart(item)
    {
        setCart([...cart, item]);
    }

    function removeFromCart(item)
    {
        const filteredItems = cart.filter(
            product => cart.indexOf(product) !== item
        );

        setCart([...filteredItems]);
    }

    function clearCart()
    {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
}