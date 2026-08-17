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

//All of the below uses hooks and client things, can/will be used when hooks are requested or required eventually if needed, though it might need some rewriting to fit existing code.
// interface ProductFormProps {
//   productId?: number;
// }

// export default function ProductPage({ productId }: ProductFormProps) {
//   const [categories, setCategories] = useState<Category[]>([]);
//   const [formData, setFormData] = useState<Product>(emptyProduct);

//   async function getProduct(productId?: number) {
//     if (!productId) return emptyProduct;

//     const response = await fetch(`${API_URL}/products/${productId}`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch product");
//     }

//     return response.json();
//   }

//   //Fetch categories from the api thing
//   async function getCategories() {
//     const response = await fetch(`${API_URL}/categories`);

//     if (!response.ok) {
//       throw new Error("Failed to fetch categories");
//     }

//     return response.json();
//   }

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
//     >,
//   ) => {
//     const { name, value } = e.target;

//     setFormData((previous) => ({
//       ...previous,
//       [name]: name === "price" || name === "categoryId" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//     event.preventDefault();

//     console.log("Submitting form data:", formData);

//     // POST formData here

//     setFormData(emptyProduct);
//   };

export default async function ProductForm({
  productId,
}: {
  productId?: number;
}) {
  const product = productId
    ? await fetch(`${API_URL}/products/${productId}`).then((res) => res.json())
    : emptyProduct;

  const categories = await fetch(`${API_URL}/categories`).then((res) =>
    res.json(),
  );

  return (
    <article className="flex flex-col m-auto max-w-7xl items-center">
      <h2 className="text-2xl">Add / Edit product</h2>
      <form className="flex flex-col gap-4 items-start max-w-2xl m-auto">
        <div className="flex flex-col gap-1 w-full">
          <label>Product name:</label>
          <input
            type="text"
            className="border p-1 "
            name="title"
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="w-full">
          <label>Product description:</label>
          <textarea
            name="description"
            placeholder="Enter description"
            required
            className="w-full min-w-2xl min-h-8 field-sizing-content resize-none rounded border p-2"
          />
        </div>
        <div className="flex flex-col w-full">
          <label>Product Image:</label>
          <input
            type="text"
            name="thumbnail"
            defaultValue={product.description}
            placeholder="Enter thumbnail"
            required
            className="border p-1 rounded"
          />
        </div>
        <div className="flex w-full">
          <div className="flex flex-col">
            <label>Price:</label>
            <input
              type="number"
              name="price"
              defaultValue={product.price}
              placeholder="Enter price"
              required
              className="border  h-8 p-1 rounded"
            />
          </div>
          <div className="flex flex-col m-auto">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              defaultValue={product.brand}
              placeholder="Enter brand"
              required
              className="border  h-8 p-1 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Category</label>
            <select
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
}
