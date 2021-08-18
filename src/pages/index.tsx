import Head from 'next/head'

import { useEffect, useContext } from 'react';

import { GetStaticProps } from 'next';

import Carousel from '../components/Carousel';
import { ProductCard } from '../components/ProductCard';

import { getAPIClient } from '../services/apiClient';

import styles from "./home.module.css";
import { LoadingContext } from '../contexts/LoadingContext';

import { ProductType } from "../types/products/index";
import WhatsappIcon from '../components/WhatsappIcon';
import Newsletter from '../components/Newsletter';

type HomePageProps = {
  lastProducts: ProductType[];
  trendProducts: ProductType[];
  isLoading: boolean;
}

export default function Home(props: HomePageProps) {

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
          {props.lastProducts?.map(product => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              favorite={product.isFavorite}
              isLoading={loading}
              img="camisa-barcelona"
              stars={product.stars}
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
          {props.trendProducts.length > 0 && <h1 className="mb-5 title-section">Mais popular</h1>}

          <div className={styles["products-list"]}>
            {props.trendProducts?.map(product => (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                favorite={product.isFavorite}
                isLoading={loading}
                img="camisa-barcelona"
                stars={product.stars}
              />
            ))}
          </div>
        </section>

        <section className={`section ${styles["newsletter-section"]}`}>
          <Newsletter />
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

        <WhatsappIcon
          phone={process.env.NEXT_PUBLIC_CONTACT_PHONE}
          message="Olá, vim do site do Geral. Gostaria de entrar em contato com a equipe de vocês aqui mesmo pelo Whatsapp."
        />
      </main>
    </>
  )
}

function mapResponse(response: any) {
  return response.data?.map(product => {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      stars: product.stars
    }
  });
}

export const getStaticProps: GetStaticProps = async () => {

  const api = getAPIClient();

  const { data: lastProductsResponse } = await api.get('products/latest', {
    params: {
      per_page: 8
    }
  });

  const { data: trendProductsResponse } = await api.get('products/trend', {
    params: {
      per_page: 8
    }
  });

  const lastProducts: ProductType[] = mapResponse(lastProductsResponse);

  const trendProducts: ProductType[] = mapResponse(trendProductsResponse);

  return {
    props: {
      lastProducts,
      trendProducts: trendProducts,
      isLoading: false,
    },
    revalidate: 60 * 60 * 24
  }
}
