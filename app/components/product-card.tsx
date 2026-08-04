import Image from "next/image";

interface ProductCardProps {
  title: string;
  sku: string;
  thumbnail: string;
  brand: string;
  category: string;
  availabilityStatus: string;
  stock: number;
  price: number;
}

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
    <article>
      <h2>{title}</h2>
      <p>{`SKU: ${sku}`}</p>
      <Image src={thumbnail} alt="" />
      <p>{brand}</p>
      <p>{category}</p>
      <p>{`${availabilityStatus} (${stock})`}</p>
      <p>{euros.format(price)}</p>
    </article>
  );
}

const euros = new Intl.NumberFormat("se-SE", {
  style: "currency",
  currency: "EUR",
});
