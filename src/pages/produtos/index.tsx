import Head from 'next/head';
import { Range, getTrackBackground } from 'react-range';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { ProductCard } from '../../components/ProductCard';

import styles from './styles.module.css';
import { useState } from 'react';

export default function Produtos() {
  const [initialPosition, setInitialPosition] = useState([25,200]);

  return (
    <>
      <Head>
        <title>Geral.com | Produtos por departamento</title>
      </Head>

      <header>
        <Navbar />
      </header>
      
      <main className="background-gray">
        <section>
          <img
            src="./images/banner-home.svg"
            alt="Banner"
            aria-label="Banner do site"
            className="img-fluid"
          />
        </section>

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

        <section
          className={`section collapse ${styles["filter-collapse"]}`}
          id="filter"
        >
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
        </section>
        
        <section className="section align-items-center py-0">
          <nav aria-label="breadcrumb" className="d-none d-md-flex">
            <ol className="breadcrumb px-0">
              <li className="breadcrumb-item"><a href="/">Home</a></li>
              <li className="breadcrumb-item active" aria-current="page">Masculino</li>
            </ol>
          </nav>

          <div className="d-none d-md-flex justify-content-between">
            <span className="text-gray">Exibindo 1 - 9 de 300 resultados</span>

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

            <ProductCard
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={78.98}
              favorite={true}
              img="camisa-barcelona"
            />
          </div>
        </section>

        <section className="section">
          <nav aria-label="Navegação de página exemplo">
            <ul className="pagination justify-content-center">
              <li className="page-item mr-3"><a className={`${styles["link-pagination"]} ${styles["active-link-pagination"]} page-link`} href="#">1</a></li>
              <li className="page-item mr-3"><a className={`${styles["link-pagination"]} page-link`} href="#">2</a></li>
              <li className="page-item mr-3"><a className={`${styles["link-pagination"]} page-link`} href="#">3</a></li>
              <li className="page-item">
                <a className={`${styles["next-link-pagination"]} page-link`} href="#">Próximo</a>
              </li>
            </ul>
          </nav>
        </section>
      
        <div className="whatsapp-icon">
          <a href="#">
            <img src="/icons/whatsapp-icon.svg" alt="Whatsapp-icon" />
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}