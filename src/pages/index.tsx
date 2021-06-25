import Head from 'next/head'

import { Navbar } from '../components/Navbar'
import { ProductCard } from '../components/ProductCard';
import { Footer } from '../components/Footer';

import styles from "./home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Geral.com</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className={styles.homepage}>
        <section>
          <img
            src="./images/banner-home.svg"
            alt="Banner"
            aria-label="Banner do site"
            className="img-fluid"
          />
        </section>

        <section className={`${styles["home-section"]}`}>
          <div className="row justify-content-between">
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex align-item-center">
                <img src="/icons/wallet-green.svg" className={`mr-2 ${styles["icon-section"]}`} alt="Icon" />
                <span className="align-middle">Até <b>3x vezes sem juros</b> no cartão</span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex align-item-center">
                <img src="/icons/truck-green.svg" className={`mr-2 ${styles["icon-section"]}`} alt="Icon" />
                <span className="align-middle">Entregamos para <b>todo o Brasil</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex align-item-center">
                <img src="/icons/security-green.svg" className={`mr-2 ${styles["icon-section"]}`} alt="Icon" />
                <span className="align-middle">Compre com <b> segurança</b> no cartão</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles["home-section"]} ${styles["products-list"]}`}>
          <ProductCard
            title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
            price={78.98}
            favorite={true}
            img="camisa-barcelona"
          />
          
          <ProductCard
            title="Camisa do Palmeiras | 21 Puma - Masculina"
            price={99.99}
            favorite={false}
            img="camisa-2"
          />

          <ProductCard
            title="Camisa Adidas México Home 2021-22"
            price={107.95}
            favorite={true}
            img="camisa-3"
          />

          <ProductCard
            title="Camisa Seleção da Itália 2020, Uniforme 3, Dry Cell"
            price={99.99}
            favorite={false}
            img="camisa-4"
          />

          <ProductCard
            title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
            price={78.98}
            favorite={true}
            img="camisa-barcelona"
          />

          <ProductCard
            title="Camisa do Palmeiras | 21 Puma - Masculina"
            price={99.99}
            favorite={false}
            img="camisa-2"
          />

          <ProductCard
            title="Camisa Adidas México Home 2021-22"
            price={107.95}
            favorite={true}
            img="camisa-3"
          />

          <ProductCard
            title="Camisa Seleção da Itália 2020, Uniforme 3, Dry Cell"
            price={99.99}
            favorite={false}
            img="camisa-4"
          />
        </section>
      </main>

      <Footer />
    </>
  )
}
