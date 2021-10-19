import Skeleton from "react-loading-skeleton";

import styles from "./styles.module.css";

export function ShimmerProductCartCard() {
  return (
    <div className={`p-4 mb-4 ${styles['product-cart-card']}`}>
      <div className="row">
        <div className="col-3 p-0 pl-3">
          <Skeleton height={200} width={'100%'} />
        </div>

        <div className="col-8">
          <h5 className={`small-title mb-3 ${styles["info-product"]}`}>
            <Skeleton />  
          </h5>

          <div className={`small-text ${styles["info-product"]}`}>
            <div className="mb-2">
              <Skeleton count={3} />
            </div>

            <div className="mb-2 d-flex align-items-center">
              <Skeleton width={100} />
              <Skeleton className="ml-2" width={24} height={24} />
            </div>

            <div className="mb-2 d-flex align-items-center">
              <Skeleton width={100} />
              <Skeleton className="ml-2" width={24} height={24} />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 d-flex justify-content-between">
        <div className="d-flex align-items-center">
          <Skeleton width={100} />
          <Skeleton circle={true} className="ml-2" width={24} height={24} />
          <Skeleton className="ml-2" width={24} height={24} />
          <Skeleton circle={true} className="ml-2" width={24} height={24} />
        </div>
          
        <div className="big-text">
          <Skeleton width={100} />
        </div>
      </div>
    </div>
  );
}