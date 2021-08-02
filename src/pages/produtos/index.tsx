import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ReactPaginate from 'react-paginate';

import { getAPIClient } from '../../services/apiClient';

import Carousel from '../../components/Carousel';
import { Loader } from '../../components/Loader';
import { Filter } from '../../components/Filter';
import { ProductCard } from '../../components/ProductCard';

import styles from './styles.module.css';

type Product = {
  id: number;
  title: string;
  price: number;
}

type ProdutosPageProps = {
  products: Product[];
  queryProps: {
    totalProducts: number;
    totalPages: number;
    firstProductOnPage: number;
    lastProductOnPage: number;
  }
}

export default function Produtos(props: ProdutosPageProps) {
  const api = getAPIClient();

  const [loading, setLoading] = useState(false);

  const [products, setProducts] = useState<Product[]>([]);
  const [firstProductOnPage, setFirstProductOnPage] = useState(0);
  const [lastProductOnPage, setLastProductOnPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (props) {
      setProducts(props.products);
      setFirstProductOnPage(props.queryProps.firstProductOnPage);
      setLastProductOnPage(props.queryProps.lastProductOnPage);
      setTotalPages(props.queryProps.totalPages);
      setTotalProducts(props.queryProps.totalProducts);
    }
  }, []);

  async function changePage(page) {
    setLoading(true);

    const { data } = await api.get('products', {
      params: {
        per_page: 9,
        page: page.selected + 1
      }
    });

    const products: Product[] = data.data.map(product => {
      return {
        id: product.id,
        title: product.name,
        price: product.price
      }
    });

    setProducts(products);
    setFirstProductOnPage(data.from);
    setLastProductOnPage(data.to);

    setLoading(false);
  }

  function openFilter() {
    document.querySelector('#filter')?.classList.toggle("show-filter");
  }

  return (
    <>
      <Head>
        <title>Geral.com | Produtos por departamento</title>
      </Head>
      
      <main className="background-gray">
        <Carousel />

        <section className="section d-none d-md-flex flex-column">
          <div className="row justify-content-between">
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-lg-center align-item-center">
                <img src="/icons/wallet-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Aceitamos <b>cartão, PIX e boleto</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4 mb-3 mb-lg-0">
              <div className="d-flex justify-content-lg-center align-item-center">
                <img src="/icons/truck-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Entregamos para <b>todo o Brasil</b></span>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-4">
              <div className="d-flex justify-content-lg-center align-item-center">
                <img src="/icons/security-green.svg" className="mr-2 icon-section" alt="Icon" />
                <span className="align-middle">Compre com <b> segurança</b> no cartão</span>
              </div>
            </div>
          </div>
        </section>

        <div className={`${styles["filter-bar"]} d-flex d-md-none w-100`}>
          <button className={styles["filter-collapse"]} onClick={openFilter}>
            <img src="/icons/filter.svg" alt="Filtro" />
          </button>
        </div>
        
        <section className="section align-items-center py-0">
          <nav aria-label="breadcrumb" className="d-none d-md-flex">
            <ol className="breadcrumb px-0">
              <li className="breadcrumb-item">
                <Link href="/">
                  <a>Home</a>
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">Masculino</li>
            </ol>
          </nav>

          <div className="d-none d-md-flex justify-content-between">
            <span className="text-gray">
              Exibindo {firstProductOnPage} - {lastProductOnPage} de {totalProducts} resultados
            </span>

            <div className={`d-flex align-items-center ${styles["order-filter"]}`}>
              <label htmlFor="order">Ordenar por</label>
              <select name="order" id="order" className="form-control ml-4">
                <option value="popular">Mais populares</option>
                <option value="recent">Mais recentes</option>
                <option value="lowest-price">Menor preço</option>
                <option value="biggest-price">Maior preço</option>
              </select>
            </div>
          </div>
        </section>
        
        <section className={`section ${styles["products-filter"]}`}>
          <Filter />          

          <div className={styles["products-list"]}>
            {loading ? (
              <Loader />
            ) : (
              products.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    title={product.title}
                    price={product.price}
                    favorite={true}
                    img="camisa-barcelona"
                  />
                );
              })
            )}
          </div>
        </section>

        <section className="section mt-5 mt-md-0">
          <ReactPaginate
            onPageChange={changePage}
            pageCount={totalPages}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            previousLabel="Anterior"
            nextLabel="Próximo"
            breakLabel="..."

            containerClassName="pagination justify-content-center align-items-center"
            pageClassName="page-item mr-3"
            pageLinkClassName={`${styles["link-pagination"]} page-link`}
            activeLinkClassName={`${styles["active-link-pagination"]}`}
            previousClassName="page-item"
            previousLinkClassName={`${styles["next-link-pagination"]} mr-3 page-link`}
            nextClassName="page-item"
            nextLinkClassName={`${styles["next-link-pagination"]} page-link`}
            breakLinkClassName={`${styles["break-link-pagination"]} mr-3`}
          />
        </section>
      
        <div className="whatsapp-icon">
          <a href="#">
            <img src="/icons/whatsapp-icon.svg" alt="Whatsapp-icon" />
          </a>
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const api = getAPIClient();

  const { data } = await api.get('products', {
    params: {
      per_page: 9
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
      queryProps: {
        totalProducts: data.total,
        totalPages: data.last_page,
        firstProductOnPage: data.from,
        lastProductOnPage: data.to
      }
    },
    revalidate: 60 * 60 * 24
  }
}
