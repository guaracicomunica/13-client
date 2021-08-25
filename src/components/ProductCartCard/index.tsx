import { useContext } from 'react';
import { CartContext } from '../../contexts/CartContext';
import { ProductCartType } from '../../types/products';
import { formatPrice } from '../../utils/formatPrice';

import styles from './styles.module.css';

export function ProductCartCard(props: ProductCartType) {
  const { removeFromCart } = useContext(CartContext);

  return (
    <div className={`p-4 mb-4 ${styles['product-cart-card']}`}>
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
            {props.title}
          </h5>
          <div className={`small-text ${styles["info-product"]}`}>
            <div className="mb-2">
              {props.description}
            </div>

            <div className="mb-1 d-flex align-items-center">
              <b>Tamanho:</b>
              <div className={styles["product-size"]}>
                {props.size}
              </div>
            </div>

            <div className="mb-1 d-flex align-items-center">
              <b>Cor:</b>
              <div
                className={styles["product-color"]}
                style={{backgroundColor: props.hex_code_color}}
                aria-label={props.color}
              />
            </div>
          </div>
        </div>

        <div
          className={`col-1 ${styles["delete-product-cart"]}`}
          onClick={() => removeFromCart(props.id)}
        >
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
          <b>R$ {formatPrice(props.price)}</b>
        </div>
      </div>
    </div>
  );
}