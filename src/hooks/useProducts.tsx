import { useEffect, useState } from "react";
import type { Product } from "../types/Product";
import { fetchProducts, createProduct } from "../api/productsApi";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setLoading(true);
      const data = await fetchProducts();
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar produtos");
    } finally {
      setLoading(false);
    }
  }

  async function addProduct(newProduct: Omit<Product, "id">): Promise<Product> {
    try {
      setLoading(true);
      const created = await createProduct(newProduct);
      setProducts((prev) => [...prev, created]);
      return created;
    } catch (err) {
      console.error(err);
      setError("Erro ao criar produto");
      throw err;
    } finally {
      setLoading(false);
    }
  }

  return { products, loading, error, addProduct, reload: loadProducts };
}
