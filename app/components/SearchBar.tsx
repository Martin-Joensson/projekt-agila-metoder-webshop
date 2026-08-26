"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/types";
import { ChangeEvent } from "react";
import { updateFilter } from "../utils/updateFilter";
type SearchProps = {
  categories: Category[];
  stock: string[];
};

export const SearchBar = ({ categories, stock }: SearchProps) => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const stockParam = searchParams.get("stock");
  const router = useRouter();

  function changeFilter(
    event: ChangeEvent<HTMLSelectElement>,
    filter: "category" | "stock",
  ) {
    const params = updateFilter(
      searchParams,
      filter,
      event.currentTarget.value,
    );

    router.replace(`/?${params.toString()}`);
  }

  return (
    <form className="flex items-center flex-col md:flex-row bg-white rounded-lg border border-gray-300 p-5 gap-4">
      <label htmlFor="search-product" className="sr-only">
        Search for product:
      </label>
      <input
        id="search-product"
        placeholder="Search products..."
        className="w-full md:w-auto flex-1 px-3 py-2 border border-gray-300 rounded-md"
      />

      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
        <label htmlFor="category-filter" className="sr-only">
          Filter by category:
        </label>
        <select
          id="category-filter"
          className="w-full md:w-auto p-2 border border-gray-300 hover:bg-gray-200 active:bg-gray-300 rounded-md"
          value={category ?? ""}
          onChange={(event) => changeFilter(event, "category")}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        <label htmlFor="stock-filter" className="sr-only">
          Filter by stock-availability:
        </label>
        <select
          id="stock-filter"
          className="w-full md:w-auto p-2 border border-gray-300  hover:bg-gray-200 active:bg-gray-300 rounded-md"
          value={stockParam ?? ""}
          onChange={(event) => changeFilter(event, "stock")}
        >
          <option value="">All Stock</option>

          {stock.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white sm:w-auto flex items-center gap-1 p-2 border border-indigo-500 hover:bg-white hover:text-black  rounded-md active:translate-y-px ease-in duration-100"
        >
          <span className="material-symbols material-symbols-filled ">
            Filter_alt
          </span>
          <span>Search</span>
        </button>
      </div>
    </form>
  );
};
