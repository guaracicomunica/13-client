import Head from 'next/head';

import styles from './styles.module.css';

export default function PreparandoProduto() {
    return (
        <>
            <Head>
                <title>Obrigado! Preparando produto...</title>
            </Head>

            <main className="container py-5">
                <div className="row">
                    <div className="col-sm-12 d-flex flex-column justify-content-center align-items-center">
                        <h1>Obrigado!</h1>
                        <h6 className={styles.greenColor}>Estamos preparando o seu produto</h6>
                        <img src="/images/congrats.svg" alt="parabéns" className={`w-100 ${styles['max-width-md-478']}`}/>
                    </div>
                </div>
            </main>
        </>
    )
}
