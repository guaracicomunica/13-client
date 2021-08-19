import Head from 'next/head';
import Link from 'next/link';

import MenuUser from '../../components/MenuUser';

import styles from './styles.module.css';

export default function Pedidos() {
  return (
    <>
      <Head>
        <title>Meus pedidos | Geral.com</title>
      </Head>

      <main className={`background-gray ${styles["order-page"]}`}>
        <MenuUser />

        <div className={styles["wish-list"]}>
          <h1 className="title-secondary mb-4">Pedidos</h1>

          <div className={`${styles["card-product"]} card-style p-4`}>
            <div className={`col-2 border-right pl-0 ${styles["order-products"]}`}>
              <img src="./images/camisa-barcelona.svg" alt="Imagem do produto" />
              <h5 className="my-3">
                Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina
              </h5>

              <div className={styles["field"]}>
                <b className="mr-2">Tamanho</b>
                <div className={styles["product-size"]}>P</div>
              </div>

              <div className={styles["field"]}>
                <b className="mr-2">Cor</b>
                <div
                  className={styles["product-color"]}
                  style={{backgroundColor: "#118AB2"}}
                />
                <div
                  className={styles["product-color"]}
                  style={{backgroundColor: "#EF476F"}}
                />
              </div>
              
              <div className={styles["field"]}>
                <b className="mr-1">Quantidade:</b>
                <div className={styles["field-value"]}>1</div>
              </div>

              <div className={styles["field"]}>
                <b className="mr-1">Valor:</b>
                <div className={styles["field-value"]}>
                  R$ 99,99
                </div>
              </div>
            </div>

            <div className={`col-7 mt-2 border-right ${styles["order-timeline"]}`}>
              <div className={styles["timeline"]}>
                <div className={styles.step}>
                  <div className={styles["date-step"]}>
                    <span>09/06/2021</span>
                    <span>20:25</span>
                  </div>

                  <div className={`${styles["step-indicator"]} my-3`}>
                    <div className={`${styles["icon-indicator"]} ${styles["icon-indicator-complete"]}`}>
                      <img src="./icons/order.svg" alt="Pedido realizado" />
                    </div>
                  </div>

                  <div className={`${styles["step-label"]} ${styles["step-label-complete"]}`}>
                    Pedido realizado
                  </div>
                </div>
                
                <div className={styles.step}>
                  <div className={styles["date-step"]}>
                    <span>10/06/2021</span>
                    <span>08:30</span>
                  </div>

                  <div className={`${styles["step-indicator"]} my-3`}>
                    <hr className={styles.complete} />
                    <div className={`${styles["icon-indicator"]} ${styles["icon-indicator-complete"]}`}>
                      <img src="./icons/cash-green.svg" alt="Pedido realizado" />
                    </div>
                  </div>

                  <div className={`${styles["step-label"]} ${styles["step-label-complete"]}`}>
                    Pagamento confirmado
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles["date-step"]}>
                    <span>10/06/2021</span>
                    <span>08:52</span>
                  </div>

                  <div className={`${styles["step-indicator"]} my-3`}>
                    <hr className={styles.complete} />
                    <div className={`${styles["icon-indicator"]} ${styles["icon-indicator-complete"]}`}>
                      <img src="./icons/box.svg" alt="Pedido realizado" />
                    </div>
                  </div>

                  <div className={`${styles["step-label"]} ${styles["step-label-complete"]}`}>
                    Em separação
                  </div>
                </div>

                <div className={styles.step}>
                  <div className={styles["date-step"]}>
                    <span>11/06/2021</span>
                    <span>05:42</span>
                  </div>

                  <div className={`${styles["step-indicator"]} my-3`}>
                    <hr className={styles.complete} />
                    <div className={`${styles["icon-indicator"]} ${styles["icon-indicator-complete"]}`}>
                      <img src="./icons/truck-green.svg" alt="Pedido realizado" />
                    </div>
                  </div>

                  <div className={`${styles["step-label"]} ${styles["step-label-complete"]}`}>
                    Em transporte
                  </div>
                </div>

                <div className={`${styles.step} align-self-end`}>
                  <div className={`${styles["step-indicator"]} my-3`}>
                    <hr className={styles.incomplete} />
                    <div className={`${styles["icon-indicator"]} ${styles["icon-indicator-incomplete"]}`}>
                      <img src="./icons/home-gray.svg" alt="Pedido realizado" />
                    </div>
                  </div>

                  <div className={`${styles["step-label"]} ${styles["step-label-incomplete"]}`}>
                    Pedido entregue
                  </div>
                </div>
              </div>

              <div className="d-flex flex-wrap mt-auto justify-content-center align-items-center">
                <Link href="#">
                  <a
                    className="button button-secondary-outline mr-4 mb-3"
                    style={{fontSize: "0.8rem"}}
                  >
                    Acompanhar entrega
                  </a>
                </Link>

                <Link href="#"> 
                  <a className="mb-3"><b>Acompanhar pedido pelo Whatsapp</b></a>
                </Link>
              </div>
            </div>

            <div className={`col-3 mt-2 pr-0 ${styles["purchase-summary"]}`}>
              <h5 className="mb-3">
                Resumo da compra
              </h5>

              <div className={styles["field"]}>
                <b className="mr-1">Pedido:</b>
                <div className={styles["field-value"]}>
                  2598746
                </div>
              </div>

              <div className={styles["field"]}>
                <b className="mr-1">Data do pedido:</b>
                <div className={styles["field-value"]}>
                  09/06/2021
                </div>
              </div>

              <div className={styles["field"]}>
                <b className="mr-1">Valor total:</b>
                <div className={styles["field-value"]}>
                  R$ 99,99
                </div>
              </div>

              <div className={`${styles["field"]} mt-2`}>
                <b className="mr-1">Entrega em andamento</b>
              </div>

              <Link href="#">
                <a className="button button-gray-outline align-self-center mt-auto mb-3">
                  Ver detalhes
                </a>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}