import { useState } from "react";
import type { Product } from "../types/Product";

interface ProductFormProps {
  addProduct: (newProduct: Omit<Product, "id" | "createdAt">) => Promise<Product>;
  onCreated: () => void;
}

export default function ProductForm({ addProduct, onCreated }: ProductFormProps) {
  const [form, setForm] = useState({ name: "", description: "", price: "" });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setAlert(null);

    const isValidPrice = /^[0-9]*\.?[0-9]*$/.test(form.price);
    if (!isValidPrice) {
      setAlert({ type: "error", message: "O preço deve conter apenas números." });
      return;
    }

    setLoading(true);

    try {
      await addProduct({
        name: form.name,
        description: form.description,
        price: parseFloat(form.price) || 0,
      });

      setAlert({ type: "success", message: "Produto cadastrado com sucesso!" });
      setForm({ name: "", description: "", price: "" });
      onCreated();
    } catch (err) {
      console.error(err);
      setAlert({ type: "error", message: "Erro ao cadastrar produto." });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert(null), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {alert && (
        <div
          className={`p-3 rounded-lg text-sm ${
            alert.type === "success"
              ? "bg-green-700 text-green-100"
              : "bg-red-700 text-red-100"
          }`}
        >
          {alert.message}
        </div>
      )}

      <input
        name="name"
        placeholder="Nome do produto"
        value={form.name}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white"
        required
      />
      <input
        name="description"
        placeholder="Descrição"
        value={form.description}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white"
      />
      <input
        name="price"
        inputMode="decimal"
        placeholder="Preço (ex: 49.90)"
        value={form.price}
        onChange={handleChange}
        className="w-full p-2 rounded bg-slate-700 border border-slate-600 text-white"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition disabled:opacity-50"
      >
        {loading ? "Salvando..." : "Salvar Produto"}
      </button>
    </form>
  );
}
