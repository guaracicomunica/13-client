import styles from "./styles.module.css";

export function Footer() {
    return (
        <footer className={`${styles['footer']}`}>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex align-item-center justify-content-center mb-3">
                            <img src="/icons/wallet.svg" className="mr-2" alt="até" />
                            <span className="align-middle">Até <b>3x vezes sem juros</b> no cartão</span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex align-item-center justify-content-center mb-3">
                            <img src="/icons/truck.svg" className="mr-2" alt="até" />
                            <span className="align-middle">Entregamos para <b>todo o Brasil</b></span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex align-item-center justify-content-center mb-3">
                            <img src="/icons/security.svg" className="mr-2" alt="até" />
                            <span className="align-middle">Compre com <b> segurança</b> no cartão</span>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12 d-flex justify-content-center">
                        <hr className={`${styles['background-white']}  w-75`} />
                    </div>
                </div>
                <div className="row mt-4">
                    <div className="col-md-3 col-sm-12 d-flex mb-3">
                        <div>
                            <img src="/icons/logo-white.svg" alt="Geral.com" />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 d-flex align-item-center justify-content-center mb-3">
                        <ul className={`${styles['ul']}`}>
                            <li className={`${styles['li']} mb-1`}><b>MENU</b></li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>Masculino</span>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>Feminino</span>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>Infantil</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-12 d-flex align-item-center justify-content-center mb-3">
                        <ul className={`${styles['ul']}`}>
                            <li className={`${styles['li']} mb-1`}><b>ATENDIMENTO</b></li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>(84) 99999-9999</span>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>atendimento@geral.com</span>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>instagram.com/geral.store</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
}