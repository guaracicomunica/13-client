import { DefaultProductCard } from "./default";
import { ShimmerProductCard } from "./shimmer";

type ProductType = {
  title: string;
  price: number;
  img: string;
  favorite: boolean;
  isLoading: boolean;
  id: number;
  stars: number;
}

export function ProductCard(props: ProductType) {
  return  props.isLoading ? <ShimmerProductCard /> : <DefaultProductCard item={props} />
}