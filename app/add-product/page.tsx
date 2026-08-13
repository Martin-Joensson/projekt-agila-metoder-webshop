"use client";

import { Product } from "@/types";
import { useState } from "react";

export default function AddProductPage() {
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your API call or further logic here
  };

  const [formData, setFormData] = useState<Product>({
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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter text"
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
        <option value={1}>Test</option>
        <option value={2}>Test2</option>
        <option value={3}>Test3</option>
        <option value={4}>Test4</option>
      </select>
    </div>
  );
}
