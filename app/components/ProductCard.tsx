import type { Product } from "@/types";
import Image from "next/image";

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
  const availabilityColor: string =
    availabilityStatus === "In Stock"
      ? "text-green-500"
      : availabilityStatus === "Low Stock"
        ? "text-orange-500"
        : "text-red-500";

  return (
    <article className="product-table-grid | bg-white">
      <div className="grid grid-cols-[4rem_7fr] items-center gap-x-4">
        <div>
          <h2 className="font-bold">{title}</h2>
          <p className="text-sm text-gray-500">{`SKU: ${sku}`}</p>
        </div>
        <Image
          src={thumbnail}
          alt=""
          width={300}
          height={300}
          className="order-first my-2 border border-gray-300 rounded-sm"
        />
      </div>
      <p className="text-left">{brand}</p>
      <p className="text-left">{category?.name}</p>
      <p className="text-right">
        <span className={`font-semibold ${availabilityColor}`}>
          {availabilityStatus}
        </span>{" "}
        (<span>{stock}</span>)
      </p>
      <p className="text-right font-semibold">{euros.format(price)}</p>
      <div className="flex justify-end gap-1 text-2xl">
        <button
          type="button"
          className="material-symbols p-1 rounded-lg hover:outline-2"
        >
          delete
        </button>
        <button
          type="button"
          className="material-symbols p-1 rounded-lg hover:outline-2"
        >
          edit
        </button>
      </div>
    </article>
  );
}

const euros = new Intl.NumberFormat("en-UK", {
  style: "currency",
  currency: "EUR",
});
