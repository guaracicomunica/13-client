export type FilterItemType = {
  id: number;
  name: string;
}

export type ColorType = {
  id: number;
  name: string;
  hex_code: string;
}

export type FilterType = {
  sizeId: string;
  brandId: string;
  categoryId: string;
  priceMin: number;
  priceMax: number;
  materialId: string;
  colorId: string;
}