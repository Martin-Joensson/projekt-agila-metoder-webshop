"use client";
import { debounce } from "@/lib/utils";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const path = usePathname();
  const { replace } = useRouter();

  const handleSearch = debounce((term: string) => {
    const params = new URLSearchParams(searchParams);
    term.length > 2 ? params.set("search", term) : params.delete("search");
    replace(`${path}?${params.toString()}`, { scroll: false });
  }, 300);

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
