import type { Product } from "@/app/types";

type ProductCardProps = Pick<
  Product,
  | "title"
  | "sku"
  | "thumbnail"
  | "brand"
  | "category"
  | "availabilityStatus"
  | "stock"
  | "price"
>;

export default function ProductCard({
  title,
  sku,
  thumbnail,
  brand,
  category,
  availabilityStatus,
  stock,
  price,
}: ProductCardProps) {
  return (
    <article className="grid grid-cols-1 md:grid-cols-[5fr_2fr_2fr_2fr_2fr_1fr] items-center gap-x-4 p-4 border-bs">
      <div className="grid grid-cols-[4rem_7fr] items-center gap-x-4">
        <div>
          <h2>{title}</h2>
          <p className="text-sm">{`SKU: ${sku}`}</p>
        </div>
        <img src={thumbnail} alt="" className="order-first m-2 border" />
      </div>
      <p>{brand}</p>
      <p>{category?.name}</p>
      <p className="text-right">{`${availabilityStatus} (${stock})`}</p>
      <p className="text-right">{euros.format(price)}</p>
      <div className="text-right">
        <button type="button" className="material-symbols">
          delete
        </button>
        <button type="button" className="material-symbols">
          edit
        </button>
      </div>
    </article>
  );
}

const euros = new Intl.NumberFormat("se-SE", {
  style: "currency",
  currency: "EUR",
});
