import Link from "next/link";
import styles from "./styles.module.css";

export function Footer() {
    return (
        <footer className={`${styles['footer']}`}>
            <div className="container">
                <div className="row mt-5">
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex justify-content-md-center align-item-center mb-3">
                            <img src="/icons/wallet.svg" className="mr-2" alt="até" />
                            <span className="align-middle">Aceitamos <b>cartão, PIX e boleto</b></span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex justify-content-md-center align-item-center mb-3">
                            <img src="/icons/truck.svg" className="mr-2" alt="até" />
                            <span className="align-middle">Entregamos para <b>todo o Brasil</b></span>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-4">
                        <div className="d-flex justify-content-md-center align-item-center mb-3">
                            <img src="/icons/security.svg" className="mr-2" alt="até" />
                            <span className="align-middle">Compre com <b> segurança</b> no cartão</span>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className={`${styles['hr-container']}  col-sm-12`}>
                        <hr className={`${styles['hr']} w-75`} />
                    </div>
                </div>
                <div className="row mt-4 justify-content-around">
                    <div className="col-md-2 col-sm-12 d-flex mb-3">
                        <div>
                            <img src="/icons/logo-white.svg" alt="Geral.com" />
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-12 d-flex align-item-center mb-3">
                        <ul className={`${styles['ul']}`}>
                            <li className={`${styles['li']} mb-1`}><b>MENU</b></li>
                            <li className={`${styles['li']} mb-1`}>
                                <Link href="/">
                                    <a className={styles['smoothText']}>Página Inicial</a>
                                </Link>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <Link href="/produtos">
                                    <a className={styles['smoothText']}>Todos os produtos</a>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-12 d-flex align-item-center mb-3">
                        <ul className={`${styles['ul']}`}>
                            <li className={`${styles['li']} mb-1`}><b>ATENDIMENTO</b></li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>{`${process.env.NEXT_PUBLIC_CONTACT_PHONE}`}</span>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>{`${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`}</span>
                            </li>
                            <li className={`${styles['li']} mb-1`}>
                                <span className={styles['smoothText']}>{`${process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM}`}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-3 col-sm-12 pb-5">
                        <div className="d-flex flex-wrap align-items-center">
                            <a href="#">
                                <div className={`${styles['social-media-box']} d-flex justify-content-center align-items-center mr-3 mb-2`}>
                                    <img src="/icons/facebook.svg" alt="facebook" />
                                </div>
                            </a>
                            <a href={`https://www.${process.env.NEXT_PUBLIC_CONTACT_INSTAGRAM}`} target="_blank">
                                <div className={`${styles['social-media-box']} d-flex justify-content-center align-items-center mb-2`}>
                                    <img src="/icons/instagram.svg" alt="instagram" />
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}