export const stockFilters = {
  instock: "In Stock",
  lowstock: "Low Stock",
  outofstock: "Out of Stock",
} as const;

export type StockFilter = keyof typeof stockFilters;

export function getStockCategory(stock: number): StockFilter {
  if (stock >= 10) {
    return "instock";
  }

  if (stock >= 1 && stock <= 9) {
    return "lowstock";
  }

  return "outofstock";
}
