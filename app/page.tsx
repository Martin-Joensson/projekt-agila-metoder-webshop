import { FilterCard } from "./components/FilterCard";
import type { Product, ProductsResponse, CategoriesResponse } from "./types";
import { ProductList } from "@/components/ProductList";
import { SearchBar } from "./components/SearchBar";

const API_URL = "http://localhost:4000";
const defaultLimit = "6";
export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const categories: CategoriesResponse = await fetch(
    `${API_URL}/categories`,
  ).then((res) => res.json());

  const stock = ["In Stock", "Low Stock", "Out of Stock"];

  console.log("Page Cat: ", categories);

  //Additional fetch for statistics basically.
  const { products: allProducts }: ProductsResponse = await fetch(
    `${API_URL}/products/?_sort=id&_order=desc&_expand=category`,
  ).then((res) => res.json());

  // we use the fetch() method to get the products from the API
  // in this fetch we sort using _sort and _order and we limit the number of products using _limit
  // we also use _expand to get the relational category data
  // we can use the other destructed variables like page, total and so on to create pagination or show info
  const {
    page: currentPage = "1",
    category: categorySlug = "",
    stock: stockStatus = "",
  } = await searchParams;

  const selectedCategorySlug = Array.isArray(categorySlug)
    ? categorySlug[0]
    : categorySlug;
  const selectedStockStatus = Array.isArray(stockStatus)
    ? stockStatus[0]
    : stockStatus;

  const selectedCategory = categories.find(
    (category) => category.slug === selectedCategorySlug,
  );

  const query = new URLSearchParams({
    _page: String(currentPage),
    _limit: defaultLimit,
    _sort: "id",
    _order: "desc",
    _expand: "category",
  });
  
  if (selectedCategory) {
    query.set("categoryId", String(selectedCategory.id));
  }

  if (selectedStockStatus) {
    query.set("availabilityStatus", selectedStockStatus);
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
