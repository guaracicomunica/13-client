import Head from 'next/head';
import { GetStaticProps, GetStaticPaths } from 'next';
import ReactImageMagnify from 'react-image-magnify';
import { api } from '../../services/api';
import styles from './styles-id.module.css';

type ProductProps = {
    product: any;
}

const watchImg1200 = "/images/camisa-barcelona.svg";
const srcSet = [
    `${watchImg1200} 1200w`,
].join(', ');

export default function Product({ product }: ProductProps) {
    return (
        <>
            <Head>
                <title>Detalhes de Produto</title>
            </Head>

            <section className={`${styles['product-info']} background-gray`}>
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
                        <div className="col-12 col-lg-6">
                            <div className={`${styles['magnify-container']}`}>
                                <ReactImageMagnify {...{
                                    enlargedImagePosition: 'beside',
                                    smallImage: {
                                        alt: 'Wristwatch by Ted Baker London',
                                        //isFluidWidth: false,
                                        width: 100,
                                        height: 100,
                                        src: watchImg1200,
                                        srcSet: srcSet,
                                        sizes: '(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px'
                                    },
                                    largeImage: {
                                        src: watchImg1200,
                                        width: 1200,
                                        height: 1800
                                    },
                                    enlargedImageContainerDimensions: {
                                        width: '400%',
                                        height: '300%'
                                    }
                                }} />
                            </div>
                        </div>
                        <div className="col-12 col-lg-2">
                            <span className={`${styles['frete-info']}`}>Frete Grátis</span>
                            <div>
                                <div className={`${styles['frete-info-gray']} mt-2`}>
                                    <span>A partir de</span>
                                </div>
                                <div>
                                    <span className={`${styles['frete-info-bold']} mt-2`}>R$ 99,99</span>
                                </div>
                                <div>
                                    <span className={`${styles['frete-info-parcela']} mt-2`}>5x de 19,98</span>
                                </div>
                            </div>
                            <div className="mt-2">
                                <span className="bold">Tamanho</span>
                                <div className="d-flex">
                                    <div className={`${styles['size']}`}>PP</div>
                                    <div className={`${styles['size']}`}>P</div>
                                    <div className={`${styles['size']}`}>M</div>
                                    <div className={`${styles['size']}`}>G</div>
                                </div>
                            </div>
                            <div>
                                <button
                                    className="button button-primary px-4 mt-3"
                                    onClick={() => { }}
                                >
                                    Comprar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={`p-5 background-gray-darkish`}>
                <h1 className={`${styles['banner-title']} mt-2`}>Compre nossos produtos, comente e ganhe descontos exclusivos</h1>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <img className={`${styles['banner-image']}`} src="/images/banner-product-comments.svg" />
                </div>
            </section>
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