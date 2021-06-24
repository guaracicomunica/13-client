import Head from 'next/head'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Navbar } from '../components/Navbar'
import { ProductType } from '../types/products';

export default function Carrinho() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const item = { id: 2, name: 'produto 02', price: 50.5 } as ProductType;

  return (
    <>
      <Head>
        <title>Geral.com</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main>
        
      </main>
    </>
  )
}
