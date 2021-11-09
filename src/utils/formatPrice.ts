export function formatPrice(price: number) {
  return price?.toFixed(2).replace(".", ",");
}
