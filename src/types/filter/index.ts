export type FilterProps = {
  brands: FilterItemType[];
  sizes: FilterItemType[];
  categories: FilterItemType[];
  materials: FilterItemType[];
  colors: ColorType[];
  handleFilter: (nameFilter: string, valueFilter: string) => void;
  handlePriceRange: (values: number[]) => void;
  addCategoryInFilter: (item: number) => void;
  removeCategoryInFilter: (item: number) => void;
  addColorInFilter: (item: number) => void;
  removeColorInFilter: (item: number) => void;
}

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