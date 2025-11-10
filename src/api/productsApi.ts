import type { Product } from "../types/Product";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const API_URL = `${BASE_URL}/api/products`;

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar produtos");
  return res.json();
}

export async function createProduct(
  product: Omit<Product, "id" | "createdAt">
): Promise<Product> {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  if (!res.ok) throw new Error("Erro ao criar produto");
  return res.json();
}
