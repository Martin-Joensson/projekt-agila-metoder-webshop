"use client"

import type { Product } from "@/types"
interface ProductListProps {
    products: Product[]
}
export default function ProductList({ products }: ProductListProps) {
    return (
        <section className="rounded border p-4 flex flex-col flex-1 gap-2">
            <h1 className="text-xl">Products</h1>
            <p>List of products cards component will go in here but in the meantime making a quick inline one</p>
            <ul className="flex flex-col gap-4">
                {products.map((product) =>
                    <li key={product.id} className="flex flex-1 justify-between">
                        <div>{product.title}</div>
                        <div>{product.category?.name}</div>
                    </li>
                )}
            </ul>
        </section>)
}