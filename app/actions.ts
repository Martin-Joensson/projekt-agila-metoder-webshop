"use server";

import { revalidatePath } from "next/cache";

export async function deleteProduct(id: number) {
    // TODO: actual deletion (db / API call)
    console.log("Deleting Product by ID:", id);

    revalidatePath("/");
}