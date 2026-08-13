"use client";

import { Product } from "@/types";
import { FormEvent, useEffect, useState } from "react";

interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
}

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

export default function AddProductPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<Product>(emptyProduct);

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
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
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

    event.currentTarget.reset();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-120 m-auto outline-2 outline-black p-4"
    >
      <div className="flex flex-wrap justify-center">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter product title"
        />
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter description"
        />
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          placeholder="Enter thumbnail"
        />
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          placeholder="Enter brand"
        />
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Enter price"
        />
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
        >
          {categories.map((categories) => (
            <option key={categories.id} value={categories.id}>
              {categories.name}
            </option>
          ))}
        </select>
      </div>

      <button
        className="bg-amber-500 w-fit m-auto p-2 mbs-3 rounded-xl hover:bg-amber-800 ease-in duration-200 cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
