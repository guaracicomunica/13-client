import Head from 'next/head';

import { AuthProvider } from '../contexts/AuthContext';

import 'bootstrap/dist/css/bootstrap.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp;