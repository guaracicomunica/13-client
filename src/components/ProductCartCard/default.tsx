import { useContext, useState, useEffect } from 'react';

import { CartContext } from '../../contexts/CartContext';
import { getAPIClient } from '../../services/apiClient';
import { ProductInfoCartType } from '../../types/products';
import { formatPrice } from '../../utils/formatPrice';

import styles from './styles.module.css';

type DefaultProductCartCard = {
  item: ProductInfoCartType;
}

export function DefaultProductCartCard(props: DefaultProductCartCard) {
  const { item } = props;

  const {
    removeFromCart,
    increaseProductQuantity,
    decreaseProductQuantity
  } = useContext(CartContext);

  const [productSizes, setProductSizes] = useState<string[]>([]);

  const api = getAPIClient();

  useEffect(() => {
    getAllProductSizes(item["size_id"]);
  }, [props]);

  async function getAllProductSizes(idProduct: number) {
    const { data: productsSizesData } = await api.get(`product-sizes/${idProduct}`);

    setProductSizes(productsSizesData);
  }

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
            {item.title}
          </h5>
          <div className={`small-text ${styles["info-product"]}`}>
            <div className="mb-2">
              {item.description}
            </div>

            <div className="mb-1 d-flex align-items-center">
              <b>Tamanho:</b>
              <div className={styles["available-sizes"]}>
                <div className={styles.size} key="size-pp">
                  <input
                    type="radio"
                    name="size"
                    id="size-pp"
                    disabled={!productSizes.includes('PP')}
                  />
                  <label htmlFor="size-pp">PP</label>
                </div>

                <div className={styles.size} key="size-p">
                  <input
                    type="radio"
                    name="size"
                    id="size-p"
                    disabled={!productSizes.includes('P')}
                  />
                  <label htmlFor="size-p">P</label>
                </div>

                <div className={styles.size} key="size-m">
                  <input
                    type="radio"
                    name="size"
                    id="size-m"
                    disabled={!productSizes.includes('M')}
                  />
                  <label htmlFor="size-m">M</label>
                </div>

                <div className={styles.size} key="size-g">
                  <input
                    type="radio"
                    name="size"
                    id="size-g"
                    disabled={!productSizes.includes('G')}
                  />
                  <label htmlFor="size-g">G</label>
                </div>

                <div className={styles.size} key="size-gg">
                  <input
                    type="radio"
                    name="size"
                    id="size-gg"
                    disabled={!productSizes.includes('GG')}
                  />
                  <label htmlFor="size-gg">GG</label>
                </div>
              </div>
            </div>

            <div className="mb-1 d-flex align-items-center">
              <b>Cor:</b>
              <div
                className={styles["product-color"]}
                style={{backgroundColor: item.hex_code_color}}
                aria-label={item.color}
              />
            </div>
          </div>
        </div>

        <div
          className={`col-1 ${styles["delete-product-cart"]}`}
          onClick={() => removeFromCart(item.id)}
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
            <div
              className={styles["qtd-button"]}
              onClick={() => decreaseProductQuantity(item.id)}
            >
              <img src="./icons/minus.svg" alt="Diminuir quantidade do produto" />
            </div>
            <div className={styles["qtd-product-info"]}>
              {item.quantity}
            </div>
            <div
              className={styles["qtd-button"]}
              onClick={() => increaseProductQuantity(item.id)}
            >
              <img src="./icons/plus.svg" alt="Aumentar quantidade do produto" />
            </div>
          </div>
        </div>
          
        <div className="big-text">
          <b>R$ {formatPrice(item.unit_price * item.quantity)}</b>
        </div>
      </div>
    </div>
  );
}