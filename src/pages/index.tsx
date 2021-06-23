import Head from 'next/head'

import { Navbar } from '../components/Navbar'

export default function Home() {
  return (
    <>
      <Head>
        <title>Geral.com</title>
      </Head>

      <main>
        <Navbar />
      </main>
    </>
  )
}
