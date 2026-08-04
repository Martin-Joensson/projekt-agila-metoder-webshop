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
    <article className="grid grid-cols-6">
      <div className="grid grid-cols-2">
        <div>
          <h2>{title}</h2>
          <p>{`SKU: ${sku}`}</p>
        </div>
        <img src={thumbnail} alt="" className="order-first" />
      </div>
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
