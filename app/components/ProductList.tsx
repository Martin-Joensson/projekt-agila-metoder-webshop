"use client";
import ProductCard from "./ProductCard";
import type { Product } from "@/types";
interface ProductListProps {
  products: Product[];
}
export const ProductList = ({ products }: ProductListProps) => {
  return (
    <section className="bg-neutral-50 rounded-lg border-gray-300 border">
      <ul>
        <div className="product-table-grid font-semibold text-neutral-500 text-sm mx-4 py-4">
          <p>Title</p>
          <p>Brand</p>
          <p>Category</p>
          <p>Stock</p>
          <p>Price</p>
          <p>Actions</p>
        </div>
        {products.map((product) => (
          <li key={product.id} className="flex flex-col rounded">
            <ProductCard
              key={product.id}
              title={product.title}
              sku={product.sku}
              thumbnail={product.thumbnail}
              brand={product.brand}
              category={product.category}
              availabilityStatus={product.availabilityStatus}
              stock={product.stock}
              price={product.price}
            />
          </li>
        ))}
      </ul>
    </section>
  );
};
