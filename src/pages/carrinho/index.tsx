import { useContext, useState, useEffect } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import Router from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import pagarme from 'pagarme';

import { CartContext } from '../../contexts/CartContext';
import { LoadingContext } from '../../contexts/LoadingContext';
import { ProductCard } from '../../components/ProductCard';
import { ProductCartCard } from '../../components/ProductCartCard';
import { getAPIClient } from '../../services/apiClient';
import { ProductType, ProductCartType } from '../../types/products';
import { options } from '../../utils/defaultToastOptions';
import { formatPrice } from '../../utils/formatPrice';

import styles from './styles.module.css';
import 'react-toastify/dist/ReactToastify.css';

type CarrinhoPageProps = {
  products: ProductType[];
  isLoading: boolean;
}

const productsList = [
  {
      id: 1,
      title: "Produto 01",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
      unit_price: 50.5,
      quantity: 1,
      hex_code_color: "#118AB2",
      color: "Azul",
      size: "P",
      size_id: 1
  },
  {
      id: 2,
      title: "Produto 02",
      description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.",
      unit_price: 70.99,
      quantity: 2,
      hex_code_color: "#EF476F",
      color: "Vermelho",
      size: "M",
      size_id: 2
  }
] as ProductCartType[];

export default function Carrinho(props: CarrinhoPageProps) {
  const {
    amount,
    subtotal,
    discount,
    cartProducts,
    totalQuantity,
    calculatePurchase,
    addToCart, 
    removeFromCart, 
    clearCart 
  } = useContext(CartContext);

  const { loading, setLoading } = useContext(LoadingContext);

  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    setTimeout(() => setLoading(props.isLoading), 4500);
  }, [loading]);

  useEffect(() => {
    if (props) {
      setProducts(props.products);
    }

    calculatePurchase();
  }, []);

  //transforma o valor em real para centavos
  function realToCentavos(valorEmReal: number) {
    return Math.round(valorEmReal * 100);
  }

  function getProductsInfo(idProduct: number) {
    const product = productsList.find(product => product.size_id === idProduct);

    return {
      title: product.title,
      price: realToCentavos(product["unit_price"])
    }
  }

  function getProductsFromCart() {
    const newCartProducts = cartProducts.map(product => {
      return {
        id: product["size_id"],
        title: getProductsInfo(product.id).title,
        quantity: product.quantity,
        unit_price: getProductsInfo(product.id).price,
        tangible: true
      } 
    });

    return newCartProducts;
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
        toast.error("Erro ao realizar essa compra. Por favor, aguarde alguns instantes, tente novamente ou entre em contato com o suporte.", options);
        console.log(err);
      }
    });

    checkout.open({
      amount: realToCentavos(amount),
      buttonText: "Pagar",
      customerData: "true",
      createToken: "true",
      uiColor: '#7AE582',
      paymentMethods: "credit_card, boleto",
      maxInstallments: 5,
      minInstallments: 1,
      items: getProductsFromCart(),
     //postbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL_API}/preparando-produto`
    });
  }
  
  //captura de uma transação
  function captureTransactions(tokenIdTransaction: String) {
    pagarme.client.connect({ api_key:'ak_test_6JIOewlI2n1O15fQgGgsE0poSDpsSd'})
      .then( client => 
        {
          try {
            let resp = client.transactions.capture({ id: tokenIdTransaction, amount: realToCentavos(amount) }) 
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
            
            {totalQuantity !== 0 ? (
              productsList.map(product => {
                return (
                  <ProductCartCard
                    key={product.id}
                    id={product.id}
                    quantity={product.quantity}
                    title={product.title}
                    description={product.description}
                    unit_price={product.unit_price}
                    hex_code_color={product.hex_code_color}
                    color={product.color}
                    size={product.size}
                    size_id={product.size_id}
                  />
                )
              })
            ) : (
              <div className="big-text text-center">
                <b>Carrinho vazio</b>
              </div>
            )}
          </div>

          <div className="col-lg-4 col-sm-12 mt-5 mt-lg-0">
            <h1 className="title-secondary mb-4">Resumo da Compra</h1>

            <div className={`p-4 ${styles['resume-card']}`}>
              <div className="d-flex justify-content-between">
                <span className={styles['resume-title']}>
                  Subtotal ({totalQuantity} {totalQuantity > 1 ? "itens" : "item"})
                </span>

                <span>
                  <b>R$ {formatPrice(subtotal)}</b>
                </span>
              </div>

              <hr />

              <div className="d-flex justify-content-between mt-2">
                <span className={styles['resume-title']}>
                  Descontos
                </span>

                <span>
                  <b>R$ {formatPrice(discount)}</b>
                </span>
              </div>  

              <hr />

              <div className="d-flex justify-content-between mt-2">
                <span className={styles['resume-title']}>
                  Valor Total
                </span>

                <span>
                  <b>R$ {formatPrice(amount)}</b>
                </span>
              </div>

              <div className="d-flex justify-content-end">
                <small className={`${styles['small-info']} mt-2`}>
                  Em até 5x de {formatPrice(amount / 5)} sem juros
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
