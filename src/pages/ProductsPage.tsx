import { useState } from "react";
import ProductList from "../components/ProductList";
import ProductForm from "../components/ProductForm";
import SlidePanel from "../components/SlidePanel";
import { useProducts } from "../hooks/useProducts";

export default function ProductsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const { products, addProduct, reload, loading, error } = useProducts();

  function handleCreated() {
    setIsOpen(false);
    reload();
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Gerenciamento de Produtos</h1>
          <button
            onClick={() => setIsOpen(true)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg shadow"
          >
            + Novo Produto
          </button>
        </div>

        <div className="bg-slate-800 p-6 rounded-lg shadow-lg border border-slate-700">
          <ProductList products={products} loading={loading} error={error} />
        </div>
      </div>

      <SlidePanel isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <h2 className="text-xl font-semibold mb-4">Cadastrar Produto</h2>
        <ProductForm onCreated={handleCreated} addProduct={addProduct} />
      </SlidePanel>
    </div>
  );
}
