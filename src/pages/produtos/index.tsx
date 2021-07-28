import { useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import { Range, getTrackBackground } from 'react-range';
import ReactPaginate from 'react-paginate';

import { getAPIClient } from '../../services/apiClient';

import Carousel from '../../components/Carousel';
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
    currentPage: number;
    firstProductOnPage: number;
    lastProductOnPage: number;
  }
}

export default function Produtos(props: ProdutosPageProps) {
  const api = getAPIClient();

  const [initialPosition, setInitialPosition] = useState([25,200]);

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [firstProductOnPage, setFirstProductOnPage] = useState(0);
  const [lastProductOnPage, setLastProductOnPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);

  useEffect(() => {
    if (props) {
      setProducts(props.products);
      setCurrentPage(props.queryProps.currentPage);
      setFirstProductOnPage(props.queryProps.firstProductOnPage);
      setLastProductOnPage(props.queryProps.lastProductOnPage);
      setTotalPages(props.queryProps.totalPages);
      setTotalProducts(props.queryProps.totalProducts);
    }
  }, []);

  async function changePage(page) {
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
    setCurrentPage(data.current_page);
    setFirstProductOnPage(data.from);
    setLastProductOnPage(data.to);
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
          <a
            data-toggle="collapse"
            href="#filter"
            role="button"
            aria-expanded="false"
            aria-controls="filter"
          >
            <img src="/icons/filter.svg" alt="Filtro" />
          </a>
        </div>
        
        <section className="section align-items-center py-0">
          <nav aria-label="breadcrumb" className="d-none d-md-flex">
            <ol className="breadcrumb px-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
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
          <div className={`${styles.filter} d-none d-md-flex flex-column py-5 px-4`}>
            <select name="size" id="size" className="form-control mb-3">
              <option selected={true} unselectable="off">Tamanho</option>
              <option value="pp">PP</option>
              <option value="p">P</option>
              <option value="m">M</option>
              <option value="g">G</option>
              <option value="gg">GG</option>
            </select>

            <select name="brand" id="brand" className="form-control mb-3">
              <option selected={true} unselectable="off">Marca</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
            </select>

            <select name="type-product" id="type-product" className="form-control mb-3">
              <option selected={true} unselectable="off">Tipo de produto</option>
              <option value="camisa">Camisa</option>
            </select>

            <select name="material" id="material" className="form-control mb-3">
              <option selected={true} unselectable="off">Material</option>
              <option value="algodao">Algodão</option>
              <option value="poliester">Poliéster</option>
            </select>

            <select name="rating" id="rating" className="form-control mb-3">
              <option selected={true} unselectable="off">Avaliações</option>
              <option value="five">Cinco estrelas</option>
              <option value="four">Quatro estrelas</option>
              <option value="three">Três estrelas</option>
              <option value="two">Duas estrelas</option>
              <option value="one">Uma estrela</option>
            </select>

            <div className={`${styles["filter-checkbox"]} mb-3`}>
              <input
                type="checkbox"
                name="selecao-tailandesa"
                id="selecao-tailandesa"
              />
              <label htmlFor="selecao-tailandesa">Seleções tailandesas</label>
              <div className={`${styles["icon-checkbox"]}`} />
            </div>

            <div className={`${styles["filter-checkbox"]} mb-3`}>
              <input
                type="checkbox"
                name="selecao-europeia"
                id="selecao-europeia"
              />
              <label htmlFor="selecao-europeia">Seleções europeias</label>
              <div className={`${styles["icon-checkbox"]}`} />
            </div>

            <div className={`${styles["filter-checkbox"]} mb-4`}>
              <input
                type="checkbox"
                name="selecao-brasileira"
                id="selecao-brasileira"
              />
              <label htmlFor="selecao-brasileira">Seleções brasileiras</label>
              <div className={`${styles["icon-checkbox"]}`} />
            </div>
            
            <hr />

            <h5 className="my-4">Preço</h5>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap'
              }}
            >
              <Range
                values={initialPosition}
                min={19.99}
                max={599.99}
                onChange={(initialPosition) => {
                  setInitialPosition(initialPosition);
                }}
                renderTrack={({ props, children }) => (
                  <div
                    onMouseDown={props.onMouseDown}
                    onTouchStart={props.onTouchStart}
                    style={{
                      ...props.style,
                      height: '36px',
                      display: 'flex',
                      width: '100%'
                    }}
                  >
                    <div
                      ref={props.ref}
                      style={{
                        height: '3px',
                        width: '100%',
                        background: getTrackBackground({
                          values: initialPosition,
                          colors: ['#E5E5E5', '#2C3238', '#E5E5E5'],
                          min: 19.99,
                          max: 599.99
                        })
                      }}
                    >
                      {children}
                    </div>
                  </div>
                )}
                renderThumb={({ props, isDragged }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: '16px',
                      width: '16px',
                      border: '4px solid #2C3238',
                      borderRadius: '50%',
                      backgroundColor: '#FFF',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  />
                )}
              />
              <output style={{ color: '#D4D4D4', marginBottom: '24px' }} id="output">
                R$ {initialPosition[0].toFixed(2)} - R$ {initialPosition[1].toFixed(2)}
              </output>
            </div>

            <hr />

            <h5 className="my-4">Cores</h5>
            <div className={`mb-4 ${styles.colors}`}>
              <div className={styles.color}>
                <input type="checkbox" name="color-black" id="color-black" />
                <label htmlFor="color-black" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-white" id="color-white" />
                <label htmlFor="color-white" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-gray" id="color-gray" />
                <label htmlFor="color-gray" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-red" id="color-red" />
                <label htmlFor="color-red" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-blue" id="color-blue" />
                <label htmlFor="color-blue" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-green" id="color-green" />
                <label htmlFor="color-green" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-yellow" id="color-yellow" />
                <label htmlFor="color-yellow" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-purple" id="color-purple" />
                <label htmlFor="color-purple" />
              </div>

              <div className={styles.color}>
                <input type="checkbox" name="color-brown" id="color-brown" />
                <label htmlFor="color-brown" />
              </div>
            </div>

            <hr />
          </div>

          <div className={styles["products-list"]}>
            {products.map(product => {
              return (
                <ProductCard
                  key={product.id}
                  title={product.title}
                  price={product.price}
                  favorite={true}
                  img="camisa-barcelona"
                />
              );
            })}
          </div>
        </section>

        <section className="section">
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
        currentPage: data.current_page,
        firstProductOnPage: data.from,
        lastProductOnPage: data.to
      }
    }
  }
}
