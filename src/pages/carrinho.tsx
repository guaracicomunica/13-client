import Head from 'next/head'

import { Navbar } from '../components/Navbar'

export default function Carrinho() {
  return (
    <>
      <Head>
        <title>Carrinho de Compras</title>
      </Head>

      <main>
        <Navbar />
      </main>
    </>
  )
}
