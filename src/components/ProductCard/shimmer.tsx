import Skeleton from "react-loading-skeleton";

import styles from "./styles.module.css";

type ShimmerProps = {

}

export function ShimmerProductCard(props: ShimmerProps) {
    return (
        <div className={`p-4 d-flex flex-column ${styles["product-card"]}`}>
            <div className="align-self-center w-100 text-center">
                <Skeleton height={200} width={`80%`} />
            </div>

            <h1 className={styles["product-card-title"]}>
                <Skeleton />
            </h1>

            <div className={`d-flex ${styles.rating} mb-1 text-center`}>
                <Skeleton circle={true} width={16} height={16} className="mx-1" />
                <Skeleton circle={true} width={16} height={16} className="mx-1" />
                <Skeleton circle={true} width={16} height={16} className="mx-1" />
                <Skeleton circle={true} width={16} height={16} className="mx-1" />
                <Skeleton circle={true} width={16} height={16} className="mx-1" />
            </div>

            <div className={styles["product-shipping"]}>
                <Skeleton width={`50%`} />
            </div>

            <div className="mt-1 d-inline">

            </div>

            <div className={`mt-3`}>
                <Skeleton width={`100%`} height={20}/>
            </div>
        </div>
    );
}