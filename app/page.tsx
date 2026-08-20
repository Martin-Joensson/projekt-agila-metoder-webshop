import { FilterCard } from "./components/FilterCard";
import type { ProductsResponse } from "./types";
import { ProductList } from "@/components/ProductList";
import { SearchBar } from "./components/SearchBar";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";

export default async function Home() {
  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?_limit=${defaultLimit}_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());

  const inStock = products.filter((product) => product.stock >= 10);
  const lowStock = products.filter((product) => product.stock < 10);
  const outOfStock = products.filter((product) => product.stock === 0);

  return (
    <main className="max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <FilterCard category="products" value={products.length} />
        <FilterCard category="instock" value={inStock.length} />
        <FilterCard category="lowstock" value={lowStock.length} />
        <FilterCard category="outofstock" value={outOfStock.length} />
      </div>
      <SearchBar />
      <ProductList
        products={products}
        page={page}
        pages={pages}
        total={total}
        limit={limit}
      />
    </main>
  );
}
