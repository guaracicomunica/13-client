import Link from "next/link";
import { useState } from "react";

import { ProductType } from '../../types/products/index';
import { formatPrice } from '../../utils/formatPrice';

import styles from "./styles.module.css";

type DefaultProductType = {
    item: ProductType;
}

export function DefaultProductCard(props: DefaultProductType) {
    const { item } = props;

    const [isFavorite, setIsFavorite] = useState(item.favorite);

    function handleFavoriteProduct() {
        setIsFavorite(!isFavorite);
    }

    function showRating(stars: number) {
        let rating = [];

        for (let i = 0; i < stars; i++) {
            rating.push(
                <img
                    className="mr-1"
                    src="./icons/star.svg"
                    alt="Estrela"
                    key={`star-${item.id}-${i + 1}`}
                />
            );
        }

        if (5 - stars > 0) {
            for (let i = 0; i < (5 - stars); i++) {
                rating.push(
                    <img
                        className="mr-1"
                        src="./icons/star-gray.svg"
                        alt="Estrela"
                        key={`star-gray-${item.id}-${stars - i + 1}`}
                    />
                );
            }
        }

        return rating;
    }

    return (
        <div className={`p-4 d-flex flex-column ${styles["product-card"]}`}>
            <div className="align-self-center">
                <img
                    src={`./../images/${item.img}.svg`}
                    alt="Camisa"
                    aria-label="Camisa do Barcelona"
                    className="img-fluid"
                />
            </div>

            <h1 className={styles["product-card-title"]}>
                {item.title}
            </h1>

            <div className={`d-flex ${styles.rating} mb-1`}>
                {showRating(item.stars).map(star => star)}
            </div>

            <div className={styles["product-shipping"]}>Frete grátis</div>

            <div className="d-flex mt-1 justify-content-between align-items-center">
                <div className={styles["product-price"]}>
                    <h6 className="mb-0">{`R$ ${formatPrice(item.price)}`}</h6>
                    <small>{`5x de R$ ${formatPrice(item.price / 5)}`}</small>
                </div>

                <div className={styles.favorite} onClick={handleFavoriteProduct}>
                    {isFavorite ? (
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
                    )}
                </div>
            </div>

            <div className={`mt-3 ${styles.buttons}`}>
                <Link href={`/produtos/${item.id}`}>
                    <a className="button button-primary-outline">Conferir</a>
                </Link>
                <Link href="/carrinho">
                    <a className="button button-secondary">
                        Comprar agora
                    </a>
                </Link>
            </div>
        </div>
    )
}