"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { CategoriesResponse } from "@/types";
import { ChangeEvent } from "react";
type SearchProps = {
  categories: CategoriesResponse;
};

export const SearchBar = ({ categories }: SearchProps) => {
  // console.log("Categories: ", categories);

  const searchParams = useSearchParams();

  const category = searchParams.get("category");
  const router = useRouter();

  function changeCategory(event: ChangeEvent<HTMLSelectElement>): void {
    const categorySlug = event.currentTarget.value;
     if (categorySlug) {
       router.replace(`/?category=${categorySlug}`);
     } else {
       router.replace("/");
     }
  }

  return (
    <form className="flex items-center flex-col sm:flex-row bg-white rounded-lg border border-gray-300 p-5 gap-4">
      <label htmlFor="search-product" className="sr-only">
        Search for product:
      </label>
      <input
        id="search-product"
        placeholder="Search products..."
        className="w-full sm:w-auto flex-1 px-3 py-2 border border-gray-300 rounded-md"
      />

      <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
        {/* Filter on category */}
        <label htmlFor="category-filter" className="sr-only">
          Filter by category:
        </label>
        <select
          id="category-filter"
          className="w-full sm:w-auto p-2 border border-gray-300 hover:bg-gray-200 active:bg-gray-300 rounded-md"
          value={category ?? ""}
          onChange={changeCategory}
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </select>

        {/* Filter on stock */}
        <label htmlFor="stock-filter" className="sr-only">
          Filter by stock-availability:
        </label>
        <select
          id="stock-filter"
          className="w-full sm:w-auto p-2 border border-gray-300  hover:bg-gray-200 active:bg-gray-300 rounded-md"
        >
          <option>All Stock</option>
        </select>

        <button
          type="submit"
          className="w-full bg-indigo-500 text-white sm:w-auto flex items-center gap-1 p-2 border border-gray-300  rounded-md hover:bg-indigo-900 active:translate-y-px"
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
