import { Product } from "@/types";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

const API_URL = "http://localhost:4000";

const emptyProduct: Product = {
  id: 0,
  title: "",
  description: "",
  thumbnail: "",
  brand: "",
  price: 0,
  categoryId: 0,
  meta: {
    createdAt: "",
    updatedAt: "",
    barcode: "",
    qrCode: "",
  },
  images: [],
};

interface ProductFormProps {
  productId?: number;
}

export const ProductForm = async ({ productId }: ProductFormProps) => {
  const product = productId
    ? await fetch(`${API_URL}/products/${productId}`).then((res) => res.json())
    : emptyProduct;

  const categories = await fetch(`${API_URL}/categories`).then((res) =>
    res.json(),
  );

  return (
    <article className="flex flex-col m-auto max-w-7xl items-center">
      <h2 className="text-2xl">Add / Edit product</h2>
      <form
        key={product.id}
        className="flex flex-col gap-4 items-start max-w-2xl m-auto"
      >
        <div className="flex flex-col gap-1 w-full">
          <label htmlFor="product-name">Product name:</label>
          <input
            id="product-name"
            type="text"
            className="border p-1 "
            name="title"
            defaultValue={product.title}
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="w-full">
          <label htmlFor="product-description">Product description:</label>
          <textarea
            id="product-description"
            name="description"
            defaultValue={product.description}
            placeholder="Enter description"
            required
            className="w-full min-w-2xl min-h-8 field-sizing-content resize-none rounded border p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="product-image">Product Image:</label>
          <input
            id="product-image"
            type="text"
            name="thumbnail"
            defaultValue={product.thumbnail}
            placeholder="Enter thumbnail"
            required
            className="border p-1 rounded"
          />
        </div>
        <div className="flex w-full">
          <div className="flex flex-col">
            <label htmlFor="product-price">Price:</label>
            <input
              id="product-price"
              type="number"
              name="price"
              defaultValue={product.price}
              placeholder="Enter price"
              required
              className="border  h-8 p-1 rounded"
            />
          </div>
          <div className="flex flex-col m-auto">
            <label htmlFor="product-brand">Brand</label>
            <input
              id="product-brand"
              type="text"
              name="brand"
              defaultValue={product.brand}
              placeholder="Enter brand"
              required
              className="border  h-8 p-1 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="product-category">Category</label>
            <select
              id="product-category"
              name="categoryId"
              defaultValue={product.categoryId}
              required
              className="border h-8 rounded"
            >
              <option value={0} disabled>
                Select a category
              </option>
              {categories.map((category: Category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="bg-amber-500 w-fit m-auto p-2 mbs-3 rounded-xl hover:bg-amber-800 ease-in duration-200 cursor-pointer"
          type="submit"
        >
          Submit
        </button>
      </form>
    </article>
  );
};
