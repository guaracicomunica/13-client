import { createContext, useState, useEffect } from 'react';

import { getAPIClient } from '../services/apiClient';
import { CartContextType, CartProductType } from '../types/cart';
import { ProductInfoCartType } from '../types/products';

const cartProductListInitialState = [
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
] as CartProductType[];

const productInfoListInitialState = [
    {
        id: 1,
        title: "Produto 01",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        unit_price: 50.5,
        quantity: 1,
        hex_code_color: "#118AB2",
        color: "Azul",
        size: "P",
        size_id: 1
    },
    {
        id: 2,
        title: "Produto 02",
        description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
        unit_price: 70.99,
        quantity: 2,
        hex_code_color: "#EF476F",
        color: "Vermelho",
        size: "M",
        size_id: 2
    }
] as ProductInfoCartType[];

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) => {
    const [cartProductList, setCartProductList] = useState<CartProductType[]>(cartProductListInitialState);
    const [productInfoList, setProductInfoList] = useState<ProductInfoCartType[]>(productInfoListInitialState);
    const [amount, setAmount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [userId, setUserId] = useState(1);
    const [cartId, setCartId] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const api = getAPIClient();

    useEffect(() => {
        getLastCart(userId);
    }, [])

    useEffect(() => {
        calculateTotalProductQuantity();
        calculatePurchase();
    }, [cartProductList]);

    async function getLastCart(userId: number) {
        const { data } = await api.get(`carts/lastcart/${userId}`);

        if (JSON.stringify(data) !== '{}') {
            setCartId(data["user_id"]);
        }
        else {
            createEmptyCart(userId);
        }
    }

    async function createEmptyCart(userId: number) {
        await api.post('carts', {
            user_id: userId,
            is_finished: 0
        });
    }

    function calculateTotalProductQuantity() {
        let quantity = 0;

        cartProductList.forEach(product => {
            quantity += product.quantity;
        });

        setTotalQuantity(quantity);
    }

    function calculatePurchase() {
        let newSubtotal = 0;

        cartProductList.forEach(product => {
            newSubtotal += product.price * product.quantity
        });

        const amount = (newSubtotal - discount) < 0 ? 0 : newSubtotal - discount;

        setAmount(amount);
        setSubtotal(newSubtotal);
    }

    function increaseProductQuantity(idProduct: number) {
        const newCartProducts = cartProductList.map(product => {
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

        setCartProductList(newCartProducts);
    }

    function decreaseProductQuantity(idProduct: number) {
        const newCartProducts = cartProductList.map(product => {
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

        setCartProductList(newCartProducts);
    }

    function addToCart(newProduct: CartProductType) {
        const newCartProductList = [...cartProductList, newProduct];
        
        setCartProductList(newCartProductList);

        console.log(newCartProductList);
    }

    function removeFromCart(idProduct: number) {
        const newCartProducts = cartProductList.filter(
            product => product.id !== idProduct
        );

        const newProductInfoList = productInfoList.filter(
            product => product.id !== idProduct
        );

        const newDiscount = newCartProducts.length == 0 ? 0 : discount;

        setDiscount(newDiscount);
        setCartProductList(newCartProducts);
        setProductInfoList(newProductInfoList);
    }

    function clearCart() {
        setCartProductList([]);
        setAmount(0);
        setSubtotal(0);
        setDiscount(0);
        setTotalQuantity(0);
    }

    return (
        <CartContext.Provider value={{
            cartProductList,
            productInfoList,
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