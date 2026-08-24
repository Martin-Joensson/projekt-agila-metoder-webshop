import { ProductForm } from "@/components/ProductForm";

type ProductPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductPage({ searchParams }: ProductPageProps) {
  const params = await searchParams;

  return (
    <main>
      <ProductForm searchParams={params} />
    </main>
  );
}
