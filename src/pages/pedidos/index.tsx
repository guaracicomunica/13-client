import Head from 'next/head';

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

          <div className={`${styles["card-product"]} card-style py-4 px-3`}>
            <div className={`col-3 border-right ${styles["order-products"]}`}>
              <img src="./images/camisa-barcelona.svg" alt="Imagem do produto" />
              <h5>Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina</h5>

              <div className={styles["product-info"]}>
                <b>Tamanho</b>
                <div className={styles["product-size"]}>P</div>
              </div>

              <div className={styles["product-info"]}>
                <b>Cor</b>
                <div className={styles["product-color"]} />
                <div className={styles["product-color"]} />
              </div>
              
              <div className={styles["product-info"]}>
                <b>Quantidade:</b>
                <div className={styles["product-info-value"]}>1</div>
              </div>

              <div className={styles["product-info"]}>
                <b>Valor:</b>
                <div className={styles["product-info-value"]}>
                  R$ 99,99
                </div>
              </div>
            </div>

            <div className="col-6 border-right">
              linha do tempo do pedido
            </div>

            <div className="col-3">
              resumo da compra
            </div>
          </div>
        </div>
      </main>
    </>
  );
}