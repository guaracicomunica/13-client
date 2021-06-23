import Head from 'next/head'
import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { Navbar } from '../components/Navbar'
import { CartType } from '../types/cart';

export default function Carrinho() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const item = {id: 2, name: 'produto 02', price: 50.5} as ProductType;

  function handleAddToCart()
  {
    addToCart(item);
  }

  function handleRemoveFromCart()
  {
    removeFromCart(item);
  }

  function handleClearCart()
  {
    clearCart();
  }

  return (
    <>
      <Head>
        <title>Carrinho de Compras</title>
      </Head>

      <main>
        <Navbar />
  
        <section>
          <button onClick={handleAddToCart}>Adicione</button>
          <button onClick={handleRemoveFromCart}>Remova</button>
          <button onClick={handleClearCart}>Limpar</button>
        </section>
  
        <section>
        <ul>
          {cart.products.map(item => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
        </section>
      </main>
    </>
  )
}
