type Props = {
  params: Promise<{
    productid: string;
  }>;
};

export default async function EditProductPage({ params }: Props) {
  const { productid } = await params;

  console.log(productid);

  return (
    <div>
      <h2 className="text-2xl font-bold">Edit Product</h2>
          <p>Product ID: {productid}</p>
          {/* shared component for creating/editing products */}
    </div>
  );
}
