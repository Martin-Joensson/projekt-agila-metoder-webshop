"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  function handleSearch(term: string) {
    const params = new URLSearchParams(searchParams);
    term ? params.set("search", term) : params.delete("search");
    replace(`${path}?${params.toString()}`, { scroll: false });
  }

  return (
    <>
      <label htmlFor="search-product" className="sr-only">
        Search for product:
      </label>
      <input
        id="search-product"
        placeholder="Search products..."
        className="w-full sm:w-auto flex-1 px-3 py-2 border border-gray-300 rounded-md"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        defaultValue={searchParams.get("search")?.toString()}
      />
    </>
  );
}
