export type ProductType = {
    id: number;
    title: string;
    price: number;
    stars: number;
    img: string;
    favorite: boolean;
    isLoading: boolean;
}

export type ProductCartType = {
    id: number;
    quantity: number;
    title: string;
    description: string;
    unit_price: number;
    hex_code_color: string;
    color: string;
    size: string;
    size_id: number;
}