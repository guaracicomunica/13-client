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
}