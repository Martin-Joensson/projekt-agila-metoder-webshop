"use server";

import { revalidatePath } from "next/cache";

const API_URL = "http://localhost:4000";

export async function deleteProduct(id: number) {
  const request = new Request(`${API_URL}/products/${id}`, {
    method: "DELETE",
  });

  const response = await fetch(request);

  if (!response.ok) {
    return {
      message: `The product could not be deleted due to the following error: ${response.status} ${response.statusText}`,
    };
  }

  revalidatePath("/");
}
