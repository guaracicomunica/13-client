import Head from 'next/head'
import Link from 'next/link';
import { useContext } from 'react';

import { CartContext } from '../../contexts/CartContext';
import { ProductCard } from '../../components/ProductCard';
import { ProductType } from '../../types/products';

import styles from './styles.module.css';

export default function Carrinho() {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);

  const item = { id: 2, title: 'produto 02', price: 50.5 } as ProductType;
  
  function openCheckout() {
    let checkout = new PagarMeCheckout.Checkout({
      encryption_key: "ENCRYPTION_KEY",
      success: function(data) {
        //to do: as transações ficarão no bd ou só na api do pagarme?
        alert(JSON.stringify(data));
      },
      error: function(err) {
        alert(JSON.stringify(err));
      },
      close: function() {
        alert("The modal has been closed.");
      }
    });

    checkout.open({
      amount: 8000,
      buttonText: "Pagar",
      customerData: "true",
      createToken: "false",
      paymentMethods: "credit_card, boleto",
      postbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL_API}`
    });
  }

  return (
    <>
      <Head>
        <title>Seu carrinho de compras</title>
      </Head>

      <main className="background-gray">
        <section className="section row justify-content-between">
          <div className="col-lg-7 col-sm-12 mb-4 mr-sm-5">
            <h1 className="title-secondary mb-4">Meu Carrinho</h1>
            <div className={`p-4 ${styles['base-card']} ${styles['product-cart-card']}`}>
              <div className="row">
                <div className="col-3 p-0 d-flex">
                  <img
                    src="/images/camisa-barcelona.svg"
                    alt="camisa do barcelona"
                    className="img-fluid align-items-center"
                  />
                </div>

                <div className="col-8">
                  <h5 className={`small-title mb-3 ${styles["info-product"]}`}>
                    Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina
                  </h5>
                  <div className={`small-text ${styles["info-product"]}`}>
                    <p className="mb-1">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                    </p>
                    <p className="mb-1">
                      <b>Tamanho:</b> P
                    </p>
                    <p className="mb-1">
                      <b>Cor:</b> Azul
                    </p>
                  </div>
                </div>

                <div className={`col-1 ${styles["delete-product-cart"]}`}>
                  <img
                    src="/icons/garbage.svg"
                    alt="Remova item do carrinho"
                    aria-label="Remova item do carrinho"
                  />
                </div>
              </div>

              <hr className="my-4" />

              <div className="d-flex justify-content-between">
                <p>
                  <b>Quantidade:</b> 1
                </p>
                  
                <p>
                  <b>R$ 99,99</b>
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-sm-12 mt-5 mt-lg-0">
            <h1 className="title-secondary mb-4">Resumo da Compra</h1>

            <div className={`p-4 ${styles['base-card']} ${styles['resume-card']}`}>
              <div className="d-flex justify-content-between">
                <span className={styles['resume-title']}>
                  Subtotal (1 item)
                </span>

                <span>
                  <b>R$ 99,99</b>
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mt-2">
                <span className={styles['resume-title']}>
                  Descontos
                </span>

                <span>
                  <b>R$ 00,00</b>
                </span>
              </div>  

              <hr />

              <div className="d-flex justify-content-between mt-2">
                <span className={styles['resume-title']}>
                  Valor Total
                </span>

                <span>
                  <b>R$ 99,99</b>
                </span>
              </div>

              <div className="d-flex justify-content-end">
                <small className={`${styles['small-info']} mt-2`}>
                  Em até 5x de 19,98 sem juros
                </small>
              </div>

              <div className={`${styles["buttons-cart"]} mt-5`}>
                <button
                  className="button button-primary"
                  onClick={openCheckout}
                >
                  Continuar
                </button>

                <Link href="/produtos">
                  <a className="button button-secondary-outline mt-3">
                    Escolher mais produtos
                  </a>
                </Link>
              </div>

              <div className="d-flex justify-content-center align-items-center mt-5">
                <img src="/icons/lock.svg" width={9} />
                <small className={styles["safe-purchase"]}>
                  Compra segura
                </small>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <h1 className="mb-5 title-secondary">
            Aproveite e leve também
          </h1>

          <div className={styles["products-list"]}>
            <ProductCard
              id={1}
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={99.99}
              favorite={true}
              isLoading={false}
              img="camisa-barcelona"
              stars={5}
            />

            <ProductCard
              id={2}
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={99.99}
              favorite={true}
              isLoading={false}
              img="camisa-barcelona"
              stars={5}
            />

            <ProductCard
              id={3}
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={99.99}
              favorite={true}
              isLoading={false}
              img="camisa-barcelona"
              stars={5}
            />

            <ProductCard
              id={4}
              title="Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina"
              price={99.99}
              favorite={true}
              isLoading={false}
              img="camisa-barcelona"
              stars={5}
            />
          </div>
        </section>
      </main>
    </>
  )
}
