import { FilterCard } from "./components/FilterCard";
import type { Category, ProductsResponse } from "./types";
import { ProductList } from "@/components/ProductList";
import { SearchBar } from "@/components/SearchBar";
import { Pagination } from "@/components/Pagination";
import { getStockCategory, stockFilters } from "./utils/stock";

const API_URL = "http://localhost:4000";
const defaultLimit = 6;

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string | undefined;
  }>;
}) {
  const categories: Category[] = await fetch(`${API_URL}/categories`).then(
    (res) => res.json(),
  );

  const { products: allProducts }: ProductsResponse = await fetch(
    `${API_URL}/products`,
  ).then((res) => res.json());

  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const {
    page: currentPage = "1",
    category: categorySlug = "",
    stock: stockFilter = "",
  } = await searchParams;

  const selectedCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  // Filter all products first
  let filteredProducts = allProducts;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(
      (product) => product.categoryId === selectedCategory.id,
    );
  }

  if (
    stockFilter === "instock" ||
    stockFilter === "lowstock" ||
    stockFilter === "outofstock"
  ) {
    filteredProducts = filteredProducts.filter(
      (product) => getStockCategory(product.stock) === stockFilter,
    );
  }

  // Sort
  filteredProducts = [...filteredProducts].sort((a, b) => b.id - a.id);

  // Pagination
  const page = Number(currentPage);
  const limit = defaultLimit;
  const total = filteredProducts.length;
  const pages = Math.ceil(total / limit);

  const start = (page - 1) * limit;
  const products = filteredProducts.slice(start, start + limit);

  // URL params for pagination
  const urlParams = new URLSearchParams();

  if (categorySlug) {
    urlParams.set("category", categorySlug);
  }

  if (stockFilter) {
    urlParams.set("stock", stockFilter);
  }

  // Statistics
  const inStock = allProducts.filter(
    (product) => getStockCategory(product.stock) === "instock",
  );

  const lowStock = allProducts.filter(
    (product) => getStockCategory(product.stock) === "lowstock",
  );

  const outOfStock = allProducts.filter(
    (product) => getStockCategory(product.stock) === "outofstock",
  );

  return (
    <main className="max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <FilterCard category="products" value={allProducts.length} />

        <FilterCard category="instock" value={inStock.length} />

        <FilterCard category="lowstock" value={lowStock.length} />

        <FilterCard category="outofstock" value={outOfStock.length} />
      </div>

      <SearchBar categories={categories} stock={stockFilters} />

      <section className="rounded-lg border-gray-300 border overflow-hidden">
        <ProductList products={products} />

        <Pagination
          page={page}
          pages={pages}
          total={total}
          limit={limit}
          urlParams={urlParams}
        />
      </section>
    </main>
  );
}
