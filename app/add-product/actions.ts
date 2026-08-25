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
    const john = formdata.get("stock") as string;

    const newProduct = {
        title,
        price: parseInt(price,10),
        description,
        thumbnail,
        categoryId: parseInt(categoryId, 10),
        brand,
        stock
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

// export async function DeleteProductAction(id: number){
//     try {
//         await fetch(`http://localhost:4000/products/${id}`, {
//             method: "DELETE",
//         });

//         revalidatePath("/")

//         return true;

//     } catch (error) {
        
//     }
// }