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

export type FilterItemType = {
    id: number;
    name: string;
}

export type FilterType = {
    sizeId: string;
    brandId: string;
    categoryId: string;
    priceMin: number;
    priceMax: number;
    materialId: string;
}