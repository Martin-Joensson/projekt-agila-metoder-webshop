"use client";

import { Product } from "@/types";
import { FormEvent, useEffect, useState } from "react";

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

export default function ProductPage({ productId }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Product>(emptyProduct);

  useEffect(() => {
    if (!productId) return;

    async function getProduct() {
      try {
        const response = await fetch(`${API_URL}/products/${productId}`);

        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }

        const product: Product = await response.json();

        setFormData(product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    }
    getProduct();
  }, [productId]);

  //Fetch categories from the api thing
  useEffect(() => {
    async function getCategories() {
      try {
        const response = await fetch("http://localhost:4000/categories");

        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }

        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    getCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: name === "price" || name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log("Submitting form data:", formData);

    // POST formData here

    setFormData(emptyProduct);
  };

  return (
    <article className="flex flex-col m-auto max-w-7xl items-center">
      <h2 className="text-2xl">Add / Edit product</h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 items-start max-w-2xl m-auto"
      >
        <div className="flex flex-col gap-1 w-full">
          <label>Product name:</label>
          <input
            type="text"
            className="border p-1 "
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </div>
        <div className="w-full">
          <label>Product description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
            value={formData.thumbnail}
            onChange={handleChange}
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
              value={formData.price}
              onChange={handleChange}
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
              value={formData.brand}
              onChange={handleChange}
              placeholder="Enter brand"
              required
              className="border  h-8 p-1 rounded"
            />
          </div>
          <div className="flex flex-col">
            <label>Category</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              required
              className="border h-8 rounded"
            >
              <option value={0} disabled>
                Select a category
              </option>
              {categories.map((category) => (
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
