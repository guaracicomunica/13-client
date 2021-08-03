import styles from './styles.module.css';
import { LoadingPropsType } from '../../types/loading';

export default function Carousel(props: LoadingPropsType) {
  const isLoading = props.isLoading;
  return (
    <section
      id="carousel-home"
      className={`${styles['carousel-dimensions']} carousel slide`}
      data-ride="carousel"
    >
      {
        isLoading
          ?
          <div className="text-center">
                  <img
                    className={`${styles['blur']} d-block w-100`}
                    src="/images/banner-home.svg"
                    alt="Segundo Slide"
                  />            
          </div>
          :
          <div>
            <div>
              <ol className="carousel-indicators">
                <li
                  data-target="#carousel-home"
                  data-slide-to="0"
                  className={`${styles["carousel-item-indicator"]} active`}
                />
                <li
                  data-target="#carousel-home"
                  data-slide-to="1"
                  className={styles["carousel-item-indicator"]}
                />
                <li
                  data-target="#carousel-home"
                  data-slide-to="2"
                  className={styles["carousel-item-indicator"]}
                />
              </ol>

              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src="/images/banner-home.svg"
                    alt="Primeiro Slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="/images/banner-home.svg"
                    alt="Segundo Slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src="/images/banner-home.svg"
                    alt="Terceiro Slide"
                  />
                </div>
              </div>
            </div>
          </div>
      }
    </section>
  );
}