import { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { getAPIClient } from '../services/apiClient';
import { CartContextType, CartProductType } from '../types/cart';
import { ProductInfoCartType } from '../types/products';

import 'react-toastify/dist/ReactToastify.css';

export const CartContext = createContext({} as CartContextType);

export const CartProvider = ({ children }) => {
    const [cartProductList, setCartProductList] = useState<CartProductType[]>([]);
    const [productInfoList, setProductInfoList] = useState<ProductInfoCartType[]>([]);
    const [amount, setAmount] = useState(0);
    const [subtotal, setSubtotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [userId, setUserId] = useState(1);
    const [cartId, setCartId] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    const api = getAPIClient();

    useEffect(() => {
        getLastCart(userId);
    }, []);

    useEffect(() => {
        calculateTotalProductQuantity();
        calculatePurchase();
    }, [cartProductList]);

    async function getLastCart(userId: number) {
        const { data } = await api.get(`carts/lastcart/${userId}`);

        if (JSON.stringify(data) !== '{}') {
            setCartId(data.id);

            loadCartProducts(data.id);
        }
        else {
            createEmptyCart(userId);
        }
    }

    async function loadCartProducts(cartId: number) {
        const { data } = await api.get(`carts/${cartId}`);
        setCartProductList(data);
    }

    async function loadProductInformation(cartId: number) {
        const { data } = await api.get(`carts/productsinfo/${cartId}`);
        setProductInfoList(data);
    }

    async function createEmptyCart(userId: number) {
        await api.post('carts', {
            user_id: userId,
            is_finished: 0
        })
        .catch(function (error) {
            toast.error("Houve um erro no carregamento do seu carrinho. Carregue novamente a página.");
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

    function increaseProductQuantity(idProductCart: number) {
        let quantity = 0;

        const newCartProducts = cartProductList.map(product => {
            if (product.id === idProductCart) {
                quantity = product.quantity + 1;

                return {
                    ...product,
                    quantity: quantity
                };
            }
            else {
                return product;
            }
        });

        setCartProductList(newCartProducts);
        updateProductQuantityInDatabase(idProductCart, quantity);
    }

    function decreaseProductQuantity(idProductCart: number) {
        let quantity = 0;

        const newCartProducts = cartProductList.map(product => {
            if (product.id === idProductCart) {
                quantity = product.quantity == 1 ? 1 : product.quantity - 1

                return {
                    ...product,
                    quantity: quantity
                };
            }
            else {
                return product;
            }
        });

        setCartProductList(newCartProducts);
        updateProductQuantityInDatabase(idProductCart, quantity);
    }

    async function updateProductQuantityInDatabase(idProductCart: number, quantity: number) {
        await api.put(`carts/product/${idProductCart}`, {
            quantity: quantity
        })
        .catch(function (error) {
            toast.warning("Não foi possível alterar a quantidade do seu produto. Recarregue a página e tente novamente.");
        });
    }

    async function addToCart(cartId: number, idProduct: number) {
        await api.post('carts/product/', {
            cart_id: cartId,
            product_id: idProduct,
            quantity: 1
        })
        .then(function (response) {
            loadCartProducts(cartId);
        })
        .catch(function (error) {
            toast.warning("Não foi possível adicionar o produto ao carrinho. Recarregue a página e tente novamente.");
        });
    }

    async function removeFromCart(idProductCart: number) {
        const newCartProducts = cartProductList.filter(
            product => product.id !== idProductCart
        );

        const newProductInfoList = productInfoList.filter(
            product => product.id !== idProductCart
        );

        const newDiscount = newCartProducts.length == 0 ? 0 : discount;

        setDiscount(newDiscount);
        setCartProductList(newCartProducts);
        setProductInfoList(newProductInfoList);

        await api.delete(`carts/product/${idProductCart}`)
        .catch(function (error) {
            toast.warning("Não foi possível remover o produto. Recarregue a página e tente novamente.");
        });
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
            loadProductInformation,
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