export type ProductType = {
    id: number;
    title: string;
    price: number;
    isFavorite: boolean;
    stars: number;
}

export type ProductCartType = {
    id: number;
    title: string;
    description: string;
    price: number;
    hex_code_color: string;
    color: string;
    size: string;
    size_id: number;
}