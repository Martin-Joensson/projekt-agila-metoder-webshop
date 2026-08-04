import type { Product } from "@/types"
interface ProductListProps {
    products: Product[]
}
export default function ProductList({ products }: ProductListProps) {
    return (
        <section className="w-full rounded border p-4">
            <h1 className="text-xl">Products</h1>
            <p>List of products cards component will go in here but in the meantime...</p>
            <ul>
                <li>{products.map((product) => <h2 key={product.id}>{product.title} - {product.category?.name}</h2>)}</li>
            </ul>
        </section>)
}