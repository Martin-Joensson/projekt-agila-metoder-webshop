"use server";

import { revalidatePath } from "next/cache";

export async function AddProductAction(formdata: FormData) {
    const API_URL = "http://localhost:4000/products";
    const productId = formdata.get("productId")?.toString();

    const title = formdata.get("title") as string;
    const price = formdata.get("price") as string;
    const description = formdata.get("description") as string;
    const thumbnail = formdata.get("thumbnail") as string;
    const categoryId = formdata.get("categoryId") as string;
    const brand = formdata.get("brand") as string;
    const stock = formdata.get("stock") as string;

    const availabilityStatus = getStockStatus(parseInt(stock, 10));

    const newProduct = {
        title,
        price: parseInt(price,10),
        description,
        thumbnail,
        categoryId: parseInt(categoryId, 10),
        brand,
        stock,
        availabilityStatus
    }

    try {
        const response = await fetch(productId ? `${API_URL}/${productId}` : API_URL, {
            method: productId ? "PATCH" : "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        });

        if (!response.ok) {
            throw new Error(`API returned ${response.status} ${response.statusText}`);
        }
        
    } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown error";
        throw new Error(`Failed to create product: ${message}`);
    }
    
    revalidatePath("/")
    
}

const getStockStatus = (stockNum: number): string => {
     if (stockNum <= 0 ) {
        return "Out of Stock";
    }

    if (stockNum < 10 && stockNum < 0) {
        return "Low Stock";
    }

    return "In Stock";
};