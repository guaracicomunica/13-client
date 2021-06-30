import Head from 'next/head'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProductType } from '../../types/products';
import Image from 'next/image'

import styles from './styles.module.css';

export default function PreparandoProduto() {
    const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

    const item = { id: 2, name: 'produto 02', price: 50.5 } as ProductType;

    return (
        <>
            <Head>
                <title>Obrigado! Preparando produto...</title>
            </Head>

            <header>
                <Navbar />
            </header>

            <main className="container py-5">
                <div className="row">
                    <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
                        <h1>Obrigado!</h1>
                        <h6 className={styles.greenColor}>Estamos preparando o seu produto</h6>
                        <img src="/images/congrats.svg" alt="parabéns" className={`w-100 ${styles['max-width-md-478']}`}/>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    )
}
