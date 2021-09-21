import { DefaultProductCard } from "./default";
import { ShimmerProductCard } from "./shimmer";

import { ProductType } from '../../types/products/index';

export function ProductCard(props: ProductType) {
  return  props.isLoading ? <ShimmerProductCard /> : <DefaultProductCard item={props} />
}