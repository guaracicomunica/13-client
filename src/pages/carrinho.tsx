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
        <title>Carrinho de Compras</title>
      </Head>

      <main className="ml-5">

        <section>
          {cart.amount}
          {cart.discount}
          {cart.subtotal}
          <ul>
            {cart.products
              ?
              cart.products.map((product, index) =>
                <li key={index}>{product.name}</li>)
              :
              <div>Carrinho vazio</div>
            }
          </ul>
          <button onClick={() => addToCart(item)}>Adicionar</button>
          <button onClick={() => removeFromCart(item)}>Remover</button>
          <button onClick={() => clearCart()}>Limpar</button>
        </section>
      </main>
    </>
  )
}
