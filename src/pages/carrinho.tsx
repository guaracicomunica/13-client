import Head from 'next/head'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

import { Navbar } from '../components/Navbar'

export default function Carrinho() {
  const { cart, addToCart } = useContext(CartContext);

  return (
    <>
      <Head>
        <title>Carrinho de Compras</title>
      </Head>

      <main>
        <Navbar />
        <section>
        {cart?.products.map(item => (
          <li>{item.name}</li>
        ))}
        </section>
      </main>
    </>
  )
}
