import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../services/api';
import Image from 'next/image';

import styles from './styles-id.module.css';

type ProductProps = {
    product: any;
}

export default function Product({ product }: ProductProps) {
    return (
        <>
            <Head>
                <title>Detalhes de Produto</title>
            </Head>

            <main className={`${styles['product-info']} background-gray`}>
                <div className="container">
                    <div className="row mt-5">
                        <div className="col-12 col-lg-4">
                            <div>
                                <h1 className={`${styles['product-title']}`}>Camisa Barcelona 20/21 S/Nº Torcedor Nike Masculina</h1>
                            </div>
                            <div className="my-2">
                                <span className={`${styles['product-ref']}`}>Ref: 00010020</span>
                            </div>
                            <div>
                                <p className={`${styles['product-description']}`}>
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy.
                                </p>
                            </div>
                            <div>
                                <div>
                                    <span className={`${styles['avaliation-title']}`}>Avaliação Geral do Produto</span>
                                </div>
                                <div>
                                    <div className="d-flex">
                                        <div className="mr-3">
                                            <span className={`${styles['avaliation-metrics-stars-cardinal']}`}>5.0</span>
                                        </div>
                                        <div className={`${styles['avaliation-metrics-comments-cardinal']}`}>
                                            <div>
                                                <img
                                                    className="mr-1"
                                                    src="/icons/star.svg"
                                                    alt="Estrela"
                                                />
                                                <img
                                                    className="mr-1"
                                                    src="/icons/star.svg"
                                                    alt="Estrela"
                                                />
                                                <img
                                                    className="mr-1"
                                                    src="/icons/star.svg"
                                                    alt="Estrela"
                                                />
                                                <img
                                                    className="mr-1"
                                                    src="/icons/star.svg"
                                                    alt="Estrela"
                                                />
                                                <img
                                                    className="mr-1"
                                                    src="/icons/star.svg"
                                                    alt="Estrela"
                                                />
                                            </div>
                                            <div>22 avaliações</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-8">
                            <div className="">
                                <img
                                    src={`/images/camisa-barcelona.svg`}
                                    alt="Camisa"
                                    aria-label="Camisa do Barcelona"
                                    className="img-fluid"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params;
    const { data } = await api.get(`/products/${id}`);

    const product = { ...data };

    return {
        props: {
            product,
        },
        revalidate: 25000000,
    }
}