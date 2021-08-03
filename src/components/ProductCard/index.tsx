import Link from "next/link";

import styles from "./styles.module.css";

type ProductType = {
  title: string;
  price: number;
  img: string;
  favorite: boolean;
  isLoading: boolean;
}

export function ProductCard(props: ProductType) {
  return (
    <div className={`p-4 d-flex flex-column ${styles["product-card"]}`}>
      <div className="align-self-center">
        <img
          src={`./images/${props.img}.svg`}
          alt="Camisa"
          aria-label="Camisa do Barcelona"
          className="img-fluid"
        />
      </div>

      <h1 className={styles["product-card-title"]}>
        {props.title}
      </h1>

      <div className={`d-flex ${styles.rating} mb-1`}>
        <img className="mr-1" src="./icons/star.svg" alt="Estrela" />
        <img className="mr-1" src="./icons/star.svg" alt="Estrela" />
        <img className="mr-1" src="./icons/star.svg" alt="Estrela" />
        <img className="mr-1" src="./icons/star.svg" alt="Estrela" />
        <img src="./icons/star-gray.svg" alt="Estrela" />
      </div>

      <div className={styles["product-shipping"]}>Frete grátis</div>

      <div className="d-flex mt-1 justify-content-between align-items-center">
        <div className={styles["product-price"]}>
          <h6 className="mb-0">{`R$ ${props.price}`}</h6>
          <small>{`5x de R$ ${(props.price / 5).toFixed(2)}`}</small>
        </div>

        <div className={styles.favorite}>
          { props.favorite ? (
            <img
              src="./icons/heart-fill.svg"
              alt="Favorito"
              aria-label="Produto favoritado"
            />
          ) : (
            <img
              src="./icons/heart.svg"
              aria-label="Produto não favoritado"
            />
          ) }
        </div>
      </div>

      <div className={`mt-3 ${styles.buttons}`}>
        <a
          href="#"
          className="button button-primary-outline"
        >Conferir</a>
        <Link href="/carrinho">
          <a className="button button-secondary">
            Comprar agora
          </a>
        </Link>
      </div>
    </div>
  );
}