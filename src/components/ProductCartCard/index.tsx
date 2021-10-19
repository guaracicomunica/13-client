import { DefaultProductCartCard } from "./default";
import { ShimmerProductCartCard } from "./shimmer";

import { ProductInfoCartType } from "../../types/products";

export function ProductCartCard(props: ProductInfoCartType) {
  return props.isLoading ? <ShimmerProductCartCard /> : <DefaultProductCartCard item={props} />
}