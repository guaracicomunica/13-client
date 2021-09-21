import { useEffect } from 'react';
import { createContext, useState } from 'react';

import { CartType, CartContextType } from '../types/cart';
import { ProductCartType } from '../types/products';

const initialState = {
    products: [
        {
            id: 1, 
            quantity: 1,
            title: "Produto 01",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
            unit_price: 50.5,
            hex_code_color: "#118AB2",
            color: "Azul",
            size: "P",
            size_id: 1
        },
        {
            id: 2, 
            quantity: 1,
            title: "Produto 02",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
            unit_price: 70.99,
            hex_code_color: "#EF476F",
            color: "Vermelho",
            size: "M",
            size_id: 2
        }
    ], 
    amount: 0, 
    subtotal: 0, 
    discount: 5.99
} as CartType;

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState<CartType>(initialState);

    useEffect(() => {
        setCart({
            ...cart,
            amount: calculatePurchase(cart.products).amount,
            subtotal: calculatePurchase(cart.products).subtotal
        })
    }, []);

    function calculatePurchase(products: ProductCartType[]) {
        let subtotal = 0;

        products.forEach(product => {
            subtotal += product.unit_price * product.quantity
        });

        const amount = (subtotal - cart.discount) < 0 ? 0 : subtotal - cart.discount;

        return {
            subtotal,
            amount
        };
    }

    function increaseProductQuantity(idProduct: number) {
        const newCartProducts = cart.products.map(product => {
            if (product.id === idProduct) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                };
            }
            else {
                return product;
            }
        });

        setCart({
            ...cart,
            products: newCartProducts,
            amount: calculatePurchase(newCartProducts).amount, 
            subtotal: calculatePurchase(newCartProducts).subtotal
        })
    }

    function decreaseProductQuantity(idProduct: number) {
        const newCartProducts = cart.products.map(product => {
            if (product.id === idProduct) {
                return {
                    ...product,
                    quantity: product.quantity == 1 ? 1 : product.quantity - 1
                };
            }
            else {
                return product;
            }
        });

        setCart({
            ...cart,
            products: newCartProducts,
            amount: calculatePurchase(newCartProducts).amount, 
            subtotal: calculatePurchase(newCartProducts).subtotal
        })
    }

    function addToCart(item: ProductCartType) {
        const filteredItems = [...cart.products, item];
        setCart({
            ...cart,
            products: [...filteredItems], 
            amount: calculatePurchase(filteredItems).amount, 
            subtotal: calculatePurchase(filteredItems).subtotal
        });
        console.log('add to cart:', cart);
    }

    function removeFromCart(idProduct: number) {
        const filteredItems = cart.products.filter(
            product => product.id !== idProduct
        );

        const discount = filteredItems.length == 0 ? 0 : cart.discount;

        setCart({
            products: [...filteredItems], 
            amount: calculatePurchase(filteredItems).amount, 
            subtotal: calculatePurchase(filteredItems).subtotal,
            discount: discount
        });
        console.log('remove from cart:', cart);
    }

    function clearCart() {
        setCart({
            products: [], 
            amount: 0, 
            subtotal: 0, 
            discount: 0
        });
        console.log('clear cart:', cart);
    }

    return (
        <CartContext.Provider value={{
            cart,
            increaseProductQuantity,
            decreaseProductQuantity,
            addToCart,
            removeFromCart,
            clearCart
        }}>
            {children}
        </CartContext.Provider>
    );
}