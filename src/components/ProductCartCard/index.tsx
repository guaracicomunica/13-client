import { useContext, useState, useEffect } from 'react';

import { CartContext } from '../../contexts/CartContext';
import { getAPIClient } from '../../services/apiClient';
import { ProductInfoCartType } from '../../types/products';
import { formatPrice } from '../../utils/formatPrice';

import styles from './styles.module.css';

type AvailableProductSizes = {
  product_size_id: number;
  size_id: number;
}

export function ProductCartCard(props: ProductInfoCartType) {
  const {
    cartId,
    removeFromCart,
    increaseProductQuantity,
    decreaseProductQuantity,
    selectProductSize
  } = useContext(CartContext);

  const [productSizes, setProductSizes] = useState<string[]>([]);
  const [availableProductSizes, setAvailableProductSizes] = useState<AvailableProductSizes[]>([]);

  const api = getAPIClient();

  useEffect(() => {
    getAllProductSizes(props.product_id);
    getAvailableProductSizes(props.product_id);
  }, [props]);

  async function getAllProductSizes(idProduct: number) {
    const { data: productsSizesData } = await api.get(`product-sizes/${idProduct}`);

    setProductSizes(productsSizesData);
  }

  async function getAvailableProductSizes(idProduct: number) {
    const { data: productsSizesData } = await api.get(`product-sizes/available-products/${idProduct}`);

    setAvailableProductSizes(productsSizesData);
  }

  function selectSize(sizeId: number) {
    availableProductSizes.forEach(productSize => {
      if (productSize["size_id"] == sizeId) {
        selectProductSize(props.id, productSize["product_size_id"], sizeId);
      }
    });
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
            {props.title}
          </h5>
          <div className={`small-text ${styles["info-product"]}`}>
            <div className="mb-2">
              {props.description}
            </div>

            <div className="mb-1 d-flex align-items-center">
              <b>Tamanho:</b>
              <div className={styles["available-sizes"]}>
                <div className={styles.size}>
                  <input
                    type="radio"
                    name={`size-${props.id}`}
                    id={`size-pp-${props.id}`}
                    disabled={!productSizes.includes('PP')}
                    defaultChecked={props["size_id"] == 1}
                    onChange={() => selectSize(1)}
                  />
                  <label htmlFor={`size-pp-${props.id}`}>PP</label>
                </div>

                <div className={styles.size}>
                  <input
                    type="radio"
                    name={`size-${props.id}`}
                    id={`size-p-${props.id}`}
                    disabled={!productSizes.includes('P')}
                    defaultChecked={props["size_id"] == 2}
                    onChange={() => selectSize(2)}
                  />
                  <label htmlFor={`size-p-${props.id}`}>P</label>
                </div>

                <div className={styles.size}>
                  <input
                    type="radio"
                    name={`size-${props.id}`}
                    id={`size-m-${props.id}`}
                    disabled={!productSizes.includes('M')}
                    defaultChecked={props["size_id"] == 3}
                    onChange={() => selectSize(3)}
                  />
                  <label htmlFor={`size-m-${props.id}`}>M</label>
                </div>

                <div className={styles.size}>
                  <input
                    type="radio"
                    name={`size-${props.id}`}
                    id={`size-g-${props.id}`}
                    disabled={!productSizes.includes('G')}
                    defaultChecked={props["size_id"] == 4}
                    onChange={() => selectSize(4)}
                  />
                  <label htmlFor={`size-g-${props.id}`}>G</label>
                </div>

                <div className={styles.size}>
                  <input
                    type="radio"
                    name={`size-${props.id}`}
                    id={`size-gg-${props.id}`}
                    disabled={!productSizes.includes('GG')}
                    defaultChecked={props["size_id"] == 5}
                    onChange={() => selectSize(5)}
                  />
                  <label htmlFor={`size-gg-${props.id}`}>GG</label>
                </div>
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
            alt="Remova props do carrinho"
            aria-label="Remova props do carrinho"
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
              onClick={() => decreaseProductQuantity(props.id)}
            >
              <img src="./icons/minus.svg" alt="Diminuir quantidade do produto" />
            </div>
            <div className={styles["qtd-product-info"]}>
              {props.quantity}
            </div>
            <div
              className={styles["qtd-button"]}
              onClick={() => increaseProductQuantity(props.id)}
            >
              <img src="./icons/plus.svg" alt="Aumentar quantidade do produto" />
            </div>
          </div>
        </div>
          
        <div className="big-text">
          <b>R$ {formatPrice(props.unit_price * props.quantity)}</b>
        </div>
      </div>
    </div>
  );
}