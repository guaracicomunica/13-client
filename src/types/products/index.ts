import { FilterItemType } from '../filter/index';

export type ProdutosPageProps = {
    products: ProductType[];
    brands: FilterItemType[];
    sizes: FilterItemType[];
    categories: FilterItemType[];
    materials: FilterItemType[];
    queryProps: {
        totalProducts: number;
        totalPages: number;
        firstProductOnPage: number;
        lastProductOnPage: number;
    };
    isLoading: boolean;
}

export type ProductType = {
    id: number;
    title: string;
    price: number;
    isFavorite: boolean;
}