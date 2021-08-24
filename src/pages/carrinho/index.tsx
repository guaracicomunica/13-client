import { useContext, useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router';
import { ToastContainer, toast, ToastOptions } from 'react-toastify';
import pagarme from 'pagarme';

import { CartContext } from '../../contexts/CartContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ProductCard } from '../../components/ProductCard';
import { getAPIClient } from '../../services/apiClient';
import { ProductType } from '../../types/products';
import { options } from '../../utils/deafultToastOptions';

import styles from './styles.module.css';
import 'react-toastify/dist/ReactToastify.css';

type CarrinhoPageProps = {
  products: ProductType[];
  isLoading: boolean;
}

export default function Carrinho(props: CarrinhoPageProps) {
  const { cart, addToCart, removeFromCart, clearCart } = useContext(CartContext);
  const { loading, setLoading } = useContext(LoadingContext);

  const [products, setProducts] = useState([]);

  const item = { id: 2, title: 'produto 02', price: 505 } as ProductType;

  const itemToSend = { id: 2, title: 'produto 02', unit_price: 500, quantity: 1, tangible: true };
  
  const [ encryption_key_pagarme, setEncryption_key_pagarme]  = useState("");

  useEffect(() => {
    setTimeout(() => setLoading(props.isLoading), 4500);
  }, [loading]);

  useEffect(() => {
    if (props) {
      setProducts(props.products);
    }
  }, []);

  //transforma o valor em real para centavos
  function realToCentavos(valorEmReal: number = 0){
      //return valorEmReal*100;
      toast.success("teste",options);
  }

  let checkout;
  function openCheckout() {
    checkout = new window['PagarMeCheckout'].Checkout({
      encryption_key: 'ek_test_Vzvun2RUeM5NFKNDOUIj3BgqXWm5pr',
      success: function(data) {
        //to do: as transações ficarão no bd ou só na api do pagarme?
        captureTransactions(data.token);
      },
      error: function(err) {      
        checkout.close(); 
        toast.error("Erro ao realizar essa compra. Por favor, aguarde alguns instantes, tente novamente ou entre em contato com o suporte." + JSON.stringify(err),options);
        console.log(err);
      }
    });

    checkout.open({
      amount: 8000,
      buttonText: "Pagar",
      customerData: "true",
      createToken: "true",
      uiColor: '#7AE582',
      paymentMethods: "credit_card, boleto",
      items:[itemToSend],
     //postbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL_API}/preparando-produto`
    });
  }
  
  //captura de uma transação
  function captureTransactions(tokenIdTransaction: String)
  {
    pagarme.client.connect({ api_key:'ak_test_6JIOewlI2n1O15fQgGgsE0poSDpsSd'})
        .then( client => 
          {
              try {
                let resp = client.transactions.capture( { id: tokenIdTransaction, amount: 8000} ) 
                if(resp?.errors != null && resp?.errors != undefined) throw resp;
                Router.push('/preparando-produto');    
                
              } catch (e) { 
                client.transactions.refund({ id: tokenIdTransaction }) //estornando o valor
                checkout.close();
                toast.error("Ops! algo não saiu como o esperado", options)
              }
          })
          

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
                    <div className="mb-2">
                      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                    </div>

                    <div className="mb-1 d-flex align-items-center">
                      <b>Tamanho:</b>
                      <div className={styles["product-size"]}>P</div>
                    </div>

                    <div className="mb-1 d-flex align-items-center">
                      <b>Cor:</b>
                      <div
                        className={styles["product-color"]}
                        style={{backgroundColor: "#118AB2"}}
                        aria-label="Azul"
                      />
                    </div>
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
                <div className="d-flex align-items-center">
                  <b>Quantidade:</b>
                  <div className="d-flex">
                    <div className={styles["qtd-button"]}>
                      <img src="./icons/minus.svg" alt="Diminuir quantidade do produto" />
                    </div>
                    <div className={styles["qtd-product-info"]}>
                      1
                    </div>
                    <div className={styles["qtd-button"]}>
                      <img src="./icons/plus.svg" alt="Aumentar quantidade do produto" />
                    </div>
                  </div>
                </div>
                  
                <div className="big-text">
                  <b>R$ 99,99</b>
                </div>
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
            {products.length !== 0 ? (
              products.map(product => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    title={product.title}
                    price={product.price}
                    favorite={true}
                    img="camisa-barcelona"
                    isLoading={loading}
                    stars={product.stars}
                  />
                )
              })
            ) : ""}
          </div>
        </section>
      </main>
      <ToastContainer />
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const api = getAPIClient();

  const { data: dataProducts } = await api.get('products/trend', {
    params: {
      per_page: 4
    }
  });

  const products: ProductType[] = dataProducts.data.map(product => {
    return {
      id: product.id,
      title: product.name,
      price: product.price,
      stars: product.stars
    }
  });

  return {
    props: {
      products,
      isLoading: false,
    },
    revalidate: 60 * 60 * 24
  }
}
