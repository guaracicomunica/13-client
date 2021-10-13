import { createContext, useState, useEffect } from 'react';

import { CartContextType, CartProductsListType } from '../types/cart';
import { ProductCartType } from '../types/products';

const initialState = [
    {
        id: 1,
        quantity: 1,
        price: 50.5,
        size_id: 1
    },
    {
        id: 2,
        quantity: 2,
        price: 70.99,
        size_id: 2
    }
] as CartProductsListType[];

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState<CartProductsListType[]>(initialState);
    const [amount, setAmount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(5.65);
    const [userId, setUserId] = useState(1);
    const [cartId, setCartId] = useState(1);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        calculateTotalProductQuantity();
        calculatePurchase();
    }, [cartProducts]);

    function calculateTotalProductQuantity() {
        let quantity = 0;

        cartProducts.forEach(product => {
            quantity += product.quantity;
        });

        setTotalQuantity(quantity);
    }

    function calculatePurchase() {
        let newSubtotal = 0;

        cartProducts.forEach(product => {
            newSubtotal += product.price * product.quantity
        });

        const amount = (newSubtotal - discount) < 0 ? 0 : newSubtotal - discount;

        setAmount(amount);
        setSubtotal(newSubtotal);
    }

    function increaseProductQuantity(idProduct: number) {
        const newCartProducts = cartProducts.map(product => {
            if (product["size_id"] === idProduct) {
                return {
                    ...product,
                    quantity: product.quantity + 1
                };
            }
            else {
                return product;
            }
        });

        setCartProducts(newCartProducts);
    }

    function decreaseProductQuantity(idProduct: number) {
        const newCartProducts = cartProducts.map(product => {
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

        setCartProducts(newCartProducts);
    }

    function addToCart(item: ProductCartType) {
        const filteredItems = [...cartProducts, item];
        /*setCart({
            ...cart,
            products: [...filteredItems], 
            amount: calculatePurchase(filteredItems).amount, 
            subtotal: calculatePurchase(filteredItems).subtotal
        });*/
    }

    function removeFromCart(idProduct: number) {
        const filteredItems = cartProducts.filter(
            product => product.id !== idProduct
        );

        const newDiscount = filteredItems.length == 0 ? 0 : discount;

        setDiscount(newDiscount);

        /*setCart({
            products: [...filteredItems], 
            amount: calculatePurchase(filteredItems).amount, 
            subtotal: calculatePurchase(filteredItems).subtotal,
            discount: discount
        });*/
    }

    function clearCart() {
        setCartProducts([]);
        setAmount(0);
        setSubtotal(0);
        setDiscount(0);
        setTotalQuantity(0);
    }

    return (
        <CartContext.Provider value={{
            cartProducts,
            amount,
            subtotal,
            discount,
            userId,
            cartId,
            totalQuantity,
            calculatePurchase,
            calculateTotalProductQuantity,
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