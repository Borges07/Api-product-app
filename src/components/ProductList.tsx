import type { Product } from "../types/Product";

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export default function ProductList({ products, loading, error }: ProductListProps) {
  if (loading) return <div>Carregando...</div>;
  if (error) return <div>{error}</div>;
  if (!products.length) return <div>Nenhum produto cadastrado.</div>;

  return (
    <div className="grid gap-3 text-white">
      {products.map((p) => {
        const dataFormatada = p.createdAt
          ? new Date(p.createdAt).toLocaleDateString("pt-BR", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })
          : "Data não disponível";

        return (
          <div key={p.id} className="p-3 border rounded border-slate-600">
            <div className="font-semibold">{p.name}</div>
            <div className="text-sm">{p.description}</div>
            <div className="mt-1">R$ {p.price?.toFixed(2)}</div>
            <div className="text-xs text-slate-400 mt-1">
              Criado em: {dataFormatada}
            </div>
          </div>
        );
      })}
    </div>
  );
}
