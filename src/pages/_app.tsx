import Head from 'next/head';

import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { CategoryProvider } from '../contexts/CategoryContext';
import { LoadingProvider } from '../contexts/LoadingContext';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';

import 'bootstrap/dist/css/bootstrap.css';
import '../styles/global.css';
import '../styles/buttons.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <AuthProvider>
        <CartProvider>
          <LoadingProvider>
            <CategoryProvider>
              <Navbar />
              <Component {...pageProps} />
              <Footer />
            </CategoryProvider>
          </LoadingProvider>
        </CartProvider>
      </AuthProvider>
    </>
  )
}

export default MyApp;