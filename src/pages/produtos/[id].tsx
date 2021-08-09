import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';
import { api } from '../../services/api';
import Image from 'next/image';

//import styles from './styles.module.scss';

type ProductProps = {
    product: any;
}

export default function Product({ product }: ProductProps) {
    return (
        <div>
            <div className="align-self-center">
                <img
                    src={`/images/camisa-barcelona.svg`}
                    alt="Camisa"
                    aria-label="Camisa do Barcelona"
                    className="img-fluid"
                />
            </div>
        </div>
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