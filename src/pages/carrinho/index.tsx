import Head from 'next/head'
import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { Navbar } from '../../components/Navbar'
import { ProductType } from '../../types/products';
import Image from 'next/image'

import styles from './styles.module.css';

export default function Carrinho() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const item = { id: 2, name: 'produto 02', price: 50.5 } as ProductType;

  return (
    <>
      <Head>
        <title>Geral.com</title>
      </Head>

      <header>
        <Navbar />
      </header>

      <main className="container py-5">
        <div className="row">
          <div className="col-lg-7 col-sm-12 mb-4">
            <h1 className={`${styles.mediumTitle} mb-4`}>Meu Carrinho</h1>
            <div className={`"card mr-sm-5" ${styles['my-shadow']}`}>
              <div className="card-body border-none">
                <div className="container">
                  <div className="row">
                    <div className="col-md-3 col-sm-12">
                      <Image
                        src="/images/camisa-barcelona.svg"
                        alt="camisa do barcelona"
                        layout="fill"
                        objectFit="cover"
                        quality={100}
                      />
                    </div>
                    <div className="col-md-5 col-sm-12">
                      <h5 className={`card-title ${styles["smallTitle"]}`}>Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina</h5>
                      <div>
                        <p className={`card-text ${styles["smallText"]} ${styles['mb-restart-3']}`}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.</p>
                        <p className={`${styles.smallText} ${styles['mb-restart-3']}`}><b>Tamanho:</b> P</p>
                        <p className={`${styles.smallText} ${styles['mb-restart-3']}`}><b>Cor:</b>: Azul</p>
                      </div>
                    </div>
                    <div className="col-md-4 col-sm-12">
                      <img
                        src="/icons/garbage.svg"
                        alt="Remova item do carrinho"
                        aria-label="Remova item do carrinho"
                        className={styles.absoluteRigthTop}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-sm-12">
                      <hr className="justify-content-center w-100" />
                    </div>
                  </div>
                  <div className="d-flex justify-content-between">
                    <div className="">
                      <p className={`${styles.mediumText} ${styles['mb-restart-3']}`}><b>Quantidade:</b>: 1</p>
                    </div>
                    <div className="">
                      <span><b>R$99,99</b></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-sm-12">
            <h1 className={styles.mediumTitle}>Resumo da Compra</h1>
          </div>
        </div>
      </main>
    </>
  )
}
