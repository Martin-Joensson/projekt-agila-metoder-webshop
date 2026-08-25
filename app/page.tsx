import { FilterCard } from "./components/FilterCard";
import type { Category, ProductsResponse } from "./types";
import { ProductList } from "@/components/ProductList";
import { SearchBar } from "./components/SearchBar";
import { Pagination } from "./components/Pagination";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";
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

  const stock = ["In Stock", "Low Stock", "Out of Stock"];

  //Additional fetch for statistics basically.
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
    stock: stockStatus = "",
    search = "",
  } = await searchParams;

  const urlParams = new URLSearchParams();
  if (currentPage) {
    urlParams.set("page", currentPage);
  }
  if (categorySlug) {
    urlParams.set("category", categorySlug);
  }
  if (stockStatus) {
    urlParams.set("stock", stockStatus);
  }
  if (search) {
    urlParams.set("search", search);
  }

  const selectedCategory = categories.find(
    (category) => category.slug === categorySlug,
  );

  const query = new URLSearchParams({
    _page: String(currentPage),
    _limit: defaultLimit,
    _sort: "id",
    _order: "desc",
  });

  if (selectedCategory) {
    query.set("categoryId", String(selectedCategory.id));
  }
  if (stockStatus) {
    query.set("availabilityStatus", stockStatus);
  }
  if (search) {
    query.set("title_like", search);
  }

  const { products, total, page, pages, limit }: ProductsResponse = await fetch(
    `${API_URL}/products/?${query.toString()}`,
  ).then((res) => res.json());

  // Change to "availabilityStatus": "Low Stock", "In Stock", "Out of Stock"

  const inStock = allProducts.filter((product) =>
    (product.availabilityStatus ?? "").toLowerCase().includes("in stock"),
  );
  const lowStock = allProducts.filter((product) =>
    (product.availabilityStatus ?? "").toLowerCase().includes("low stock"),
  );
  const outOfStock = allProducts.filter((product) =>
    (product.availabilityStatus ?? "").toLowerCase().includes("out of stock"),
  );

  return (
    <main className="max-w-7xl w-full mx-auto p-4 flex flex-col gap-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <FilterCard category="products" value={allProducts.length} />
        <FilterCard category="instock" value={inStock.length} />
        <FilterCard category="lowstock" value={lowStock.length} />
        <FilterCard category="outofstock" value={outOfStock.length} />
      </div>
      <SearchBar categories={categories} stock={stock} />
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
