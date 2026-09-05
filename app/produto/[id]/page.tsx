"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { productCatalog } from "@/domain/product/catalog";

export default function ProductPage() {
  const params = useParams<{ id: string }>();

  const catalogItem = productCatalog.find(
    ({ offer }) => offer.productId === params.id,
  );

  if (!catalogItem) {
    return (
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium text-zinc-500">
            Match Capilar
          </p>

          <h1 className="mt-3 text-3xl font-bold text-zinc-950">
            Produto não encontrado
          </h1>

          <p className="mt-4 text-zinc-600">
            Não encontramos esse produto no catálogo atual.
          </p>

          <Link
            href="/resultado"
            className="mt-8 inline-flex rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white"
          >
            Voltar para meus resultados
          </Link>
        </div>
      </main>
    );
  }

  const { product, offer } = catalogItem;

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/resultado"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-950"
        >
          ← Voltar para resultados
        </Link>

        <div className="mt-8 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          <div className="grid md:grid-cols-2">
            <div className="flex min-h-[420px] items-center justify-center bg-zinc-100 p-10">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-h-[360px] w-full object-contain"
                />
              ) : (
                <div className="text-sm text-zinc-400">
                  Imagem indisponível
                </div>
              )}
            </div>

            <div className="p-8 md:p-10">
              <p className="text-sm font-medium uppercase tracking-wide text-zinc-500">
                {product.brand}
              </p>

              <h1 className="mt-3 text-3xl font-bold tracking-tight text-zinc-950">
                {product.name}
              </h1>

              <p className="mt-3 text-sm text-zinc-500">
                {offer.size}
              </p>

              <div className="mt-8">
                <p className="text-sm font-semibold text-zinc-900">
                  Sobre o produto
                </p>

                <p className="mt-2 leading-6 text-zinc-600">
                  Este produto faz parte do catálogo do Match Capilar e foi
                  incluído porque possui características compatíveis com
                  diferentes necessidades de cabelo.
                </p>
              </div>

              <div className="mt-8 rounded-2xl bg-zinc-50 p-5">
                <p className="text-sm font-semibold text-zinc-900">
                  Oferta encontrada
                </p>

                <div className="mt-3 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-zinc-500">
                      {offer.store}
                    </p>

                    <p className="mt-1 text-3xl font-bold text-zinc-950">
                      R$ {offer.price.toFixed(2).replace(".", ",")}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-zinc-600">
                    {offer.available ? "Disponível" : "Indisponível"}
                  </span>
                </div>
              </div>

              {offer.available && (
                <a
                  href={offer.url}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 flex w-full items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
                >
                  Ver onde comprar
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}