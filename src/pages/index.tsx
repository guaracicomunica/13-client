import Head from 'next/head'

import { useState, useEffect, useContext } from 'react';

import { GetStaticProps } from 'next';

import Carousel from '../components/Carousel';
import { ProductCard } from '../components/ProductCard';

import { getAPIClient } from '../services/apiClient';

import styles from "./home.module.css";
import { LoadingContext } from '../contexts/LoadingContext';

type Product = {
  id: number;
  title: string;
  price: number;
}


type ProdutosPageProps = {
  products: Product[];
  isLoading: boolean;
}

export default function Home(props: ProdutosPageProps) {

  const { loading, setLoading } = useContext(LoadingContext);

  useEffect(() => {
    setTimeout(() => setLoading(props.isLoading), 4500);
  }, [loading]);

  return (
    <>
      <Head>
        <title>Geral.com</title>
      </Head>

      <main className="background-gray">
        <Carousel isLoading={loading} />

        <section className="section">
          <div className="row justify-content-between">
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-md-center align-item-center">
                <img src="/icons/wallet-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Aceitamos <b>cartão, PIX e boleto</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-md-center align-item-center">
                <img src="/icons/truck-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Entregamos para <b>todo o Brasil</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex justify-content-md-center align-item-center">
                <img src="/icons/security-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Compre com <b> segurança</b> no cartão</span>
              </div>
            </div>
          </div>
        </section>

        <section className={`section ${styles["products-list"]}`}>
          {props.products.map(product => (
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              favorite={true}
              isLoading={loading}
              img="camisa-barcelona"
            />
          ))}
        </section>

        <section className="mx-3 mx-md-5 my-3">
          <img
            src="./images/banner-promocao.svg"
            alt="Banner - Promoção 50% off"
            aria-label="Promoção 50% off"
            className="img-fluid"
          />
        </section>

        <section className="section">
          <h1 className="mb-5 title-section">Mais popular</h1>

          <div className={styles["products-list"]}>
            <ProductCard
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={78.98}
              favorite={true}
              img="camisa-barcelona"
              isLoading={loading}
            />

            <ProductCard
              title="Camisa do Palmeiras | 21 Puma - Masculina"
              price={99.99}
              favorite={false}
              img="camisa-2"
              isLoading={loading}
            />

            <ProductCard
              title="Camisa Adidas México Home 2021-22"
              price={107.95}
              favorite={true}
              img="camisa-3"
              isLoading={loading}
            />

            <ProductCard
              title="Camisa Seleção da Itália 2020, Uniforme 3, Dry Cell"
              price={99.99}
              favorite={false}
              img="camisa-4"
              isLoading={loading}
            />
          </div>
        </section>

        <section className="section">
          <h1 className="mb-5 title-section">Vistos por você</h1>

          <div className={styles["products-list"]}>
            <ProductCard
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={78.98}
              favorite={true}
              img="camisa-barcelona"
              isLoading={false}
            />

            <ProductCard
              title="Camisa do Palmeiras | 21 Puma - Masculina"
              price={99.99}
              favorite={false}
              img="camisa-2"
              isLoading={false}
            />

            <ProductCard
              title="Camisa Adidas México Home 2021-22"
              price={107.95}
              favorite={true}
              img="camisa-3"
              isLoading={false}
            />

            <ProductCard
              title="Camisa Seleção da Itália 2020, Uniforme 3, Dry Cell"
              price={99.99}
              favorite={false}
              img="camisa-4"
              isLoading={false}
            />
          </div>
        </section>

        <section className={`section ${styles["newsletter-section"]}`}>
          <div className={`py-5 ${styles.newsletter}`}>
            <form>
              <div className="d-flex flex-column flex-lg-row align-items-center justify-content-around">
                <h5 className="mb-3">Quero receber promos!</h5>
                <div className="d-flex flex-column flex-md-row w-100">
                  <input
                    type="text"
                    className="form-control mb-3 mr-4 ml-lg-4"
                    placeholder="Digite seu e-mail"
                  />
                  <a href="#" className={`mb-3 button ${styles["newsletter-btn"]}`}>
                    Receber
                  </a>
                </div>
              </div>

              <div className="mt-4 d-flex justify-content-center">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="checkbox-newsletter"
                  />
                  <label
                    className={`${styles["newsletter-checkbox"]} custom-control-label`}
                    htmlFor="checkbox-newsletter"
                  >
                    Eu aceito o contrato de privacidade e todos os termos de segurança do Geral.com. Leia os termos <a href="#">aqui</a>.
                  </label>
                </div>
              </div>
            </form>
          </div>
        </section>

        <section className="section">
          <h1 className="mb-5 title-section">Categorias</h1>

          <div className={styles["category-list"]}>
            <a href="#" className={styles["img-category"]}>
              <img
                src="./images/selecoes-brasileiras.svg"
                alt="Seleções brasileiras"
                aria-label="Categoria: seleções brasileiras"
                className="img-fluid"
              />
            </a>

            <a href="#" className={styles["img-category"]}>
              <img
                src="./images/selecoes-europeias.svg"
                alt="Seleções europeias"
                aria-label="Categoria: seleções europeias"
                className="img-fluid"
              />
            </a>

            <a href="#" className={styles["img-category"]}>
              <img
                src="./images/selecoes-tailandesas.svg"
                alt="Seleções tailandesas"
                aria-label="Categoria: seleções tailandesas"
                className="img-fluid"
              />
            </a>
          </div>
        </section>

        <div className="whatsapp-icon">
          <a href="#">
            <img src="/icons/whatsapp-icon.svg" alt="Whatsapp-icon" />
          </a>
        </div>
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const api = getAPIClient();

  const { data } = await api.get('products', {
    params: {
      per_page: 8
    }
  });

  const products: Product[] = data.data.map(product => {
    return {
      id: product.id,
      title: product.name,
      price: product.price
    }
  });

  return {
    props: {
      products,
      isLoading: false,
    }
  }

}