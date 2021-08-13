import Link from "next/link";
import styles from "./styles.module.css";

type ProductType = {
    title: string;
    price: number;
    img: string;
    favorite: boolean;
    isLoading: boolean;
    id: number;
    stars: number;
}

type DefaultProductType = {
    item: ProductType;
}

export function DefaultProductCard(props: DefaultProductType) {
    const { item } = props;

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
                    <h6 className="mb-0">{`R$ ${item.price}`}</h6>
                    <small>{`5x de R$ ${(item.price / 5).toFixed(2)}`}</small>
                </div>

                <div className={styles.favorite}>
                    {item.favorite ? (
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