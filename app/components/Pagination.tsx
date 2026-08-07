import { ProductsResponse } from "@/types";
import Link from "next/link";

type PaginationProps = Omit<ProductsResponse, "products">;

export const Pagination = ({ page, pages, total, limit }: PaginationProps) => {
  const visiblePages = [];

  const start = Math.max(1, page - 2);
  const end = Math.min(pages, page + 2);

  for (let i = start; i <= end; i++) {
    visiblePages.push(i);
  }

  const buttonStyle =
    "w-12 h-12 rounded border border-gray-300 font-bold hover:bg-neutral-500 hover:text-white";

  return (
    <nav className="bg-neutral-50 py-4 flex gap-2 text-neutral-500 justify-center items-center">
      <Link
        href={`?page=${page - 1}`}
        className={`${buttonStyle} flex items-center justify-center `}
      >
        <span className="material-symbols material-symbols-filled text-3xl">
          chevron_left
        </span>
      </Link>

      <div className="flex justify-center gap-2">
        {visiblePages.map((pageNr) => (
          <Link
            key={pageNr}
            href={`?page=${pageNr}`}
            className={`${buttonStyle} flex items-center justify-center ${
              pageNr === page ? "bg-neutral-500 text-white" : "bg-white"
            }`}
          >
            {pageNr}
          </Link>
        ))}

        {end < pages - 1 && (
          <span className="flex  w-8 items-center justify-center">...</span>
        )}

        {end < pages && (
          <Link
            href={`?page=${pages}`}
            className={`${buttonStyle} flex items-center justify-center ${
              page === pages ? "bg-gray-200" : "bg-white"
            }`}
          >
            {pages}
          </Link>
        )}
      </div>
      <Link
        href={`?page=${page + 1}`}
        className={`${buttonStyle} flex items-center justify-center `}
      >
        <span className="material-symbols material-symbols-filled text-3xl">
          chevron_right
        </span>
      </Link>
    </nav>
  );
};
