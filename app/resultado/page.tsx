"use client";

import { useMemo, useSyncExternalStore } from "react";
import Link from "next/link";
import { productCatalog } from "@/domain/product/catalog";
import { calculateMatch } from "@/domain/match/engine/calculateMatch";
import { rankProducts } from "@/domain/match/engine/rankProducts";
import type { MatchResult } from "@/domain/match/engine/types";
import type { UserProfile } from "@/domain/match/types";

const USER_PROFILE_STORAGE_KEY = "match-capilar:user-profile";

let cachedProfile: UserProfile | null = null;
let hasReadStorage = false;

function subscribe() {
  return () => {};
}

function getSnapshot(): UserProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  if (hasReadStorage) {
    return cachedProfile;
  }

  hasReadStorage = true;

  const storedProfile = sessionStorage.getItem(USER_PROFILE_STORAGE_KEY);

  if (!storedProfile) {
    return null;
  }

  try {
    cachedProfile = JSON.parse(storedProfile) as UserProfile;
  } catch {
    cachedProfile = null;
  }

  return cachedProfile;
}

function getServerSnapshot(): UserProfile | null {
  return null;
}

function getProductImage(result: MatchResult): string | null {
  return result.product.imageUrl ?? null;
}

export default function ResultPage() {
  const userProfile = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );

  const ranking = useMemo<MatchResult[]>(() => {
    if (!userProfile) {
      return [];
    }

    const results = productCatalog.map(({ product, offer }) =>
      calculateMatch(userProfile, product, offer),
    );

    return rankProducts(results, userProfile);
  }, [userProfile]);

  if (!userProfile) {
    return (
      <main className="min-h-screen bg-white px-6 py-16">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-medium text-zinc-500">
            Match Capilar
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950">
            Seu Match ainda não foi realizado
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-zinc-600">
            Responda algumas perguntas sobre seu cabelo para descobrir quais
            produtos mais combinam com suas necessidades.
          </p>

          <Link
            href="/quiz"
            className="mt-8 inline-flex rounded-full bg-zinc-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-zinc-800"
          >
            Fazer meu Match
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-50 px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <header className="text-center">
          <p className="text-sm font-medium text-zinc-500">
            Match Capilar
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-zinc-950">
            Seus produtos mais compatíveis
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            Encontramos produtos que combinam com o seu perfil e com as
            necessidades que você informou.
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {ranking.map((result, index) => {
            const image = getProductImage(result);

            return (
              <article
                key={result.offer.productId}
                className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm"
              >
                <div className="relative flex h-64 items-center justify-center bg-zinc-100 p-6">
                  {index === 0 && (
                    <span className="absolute left-4 top-4 rounded-full bg-zinc-950 px-3 py-1 text-xs font-semibold text-white">
                      Melhor Match
                    </span>
                  )}

                  {image ? (
                    <img
                      src={image}
                      alt={result.product.name}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center rounded-2xl border border-dashed border-zinc-300 text-sm text-zinc-400">
                      Imagem indisponível
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                    {result.product.brand}
                  </p>

                  <h2 className="mt-2 text-xl font-bold text-zinc-950">
                    {result.product.name}
                  </h2>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-xs text-zinc-500">Compatibilidade</p>
                      <p className="text-2xl font-bold text-zinc-950">
                        {result.score}%
                      </p>
                    </div>

                    <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold capitalize text-zinc-700">
                      {result.level}
                    </span>
                  </div>

                  {result.reasons.length > 0 && (
                    <div className="mt-5">
                      <p className="text-sm font-semibold text-zinc-900">
                        Por que foi indicado?
                      </p>

                      <ul className="mt-2 space-y-2">
                        {result.reasons.slice(0, 3).map((reason) => (
                          <li
                            key={`${reason.criterion}-${reason.description}`}
                            className="text-sm leading-5 text-zinc-600"
                          >
                            {reason.description}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-5">
                    <div>
                      <p className="text-xs text-zinc-500">
                        {result.offer.size}
                      </p>
                      <p className="text-lg font-bold text-zinc-950">
                        R$ {result.offer.price.toFixed(2).replace(".", ",")}
                      </p>
                    </div>

                    <Link
                      href={`/produto/${result.offer.productId}`}
                      className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-zinc-800"
                    >
                      Conhecer produto
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <div className="mt-10 text-center">
          <Link
            href="/quiz"
            onClick={() => {
              sessionStorage.removeItem(USER_PROFILE_STORAGE_KEY);
              cachedProfile = null;
              hasReadStorage = false;
            }}
            className="text-sm font-semibold text-zinc-700 underline underline-offset-4 hover:text-zinc-950"
          >
            Refazer meu Match
          </Link>
        </div>
      </div>
    </main>
  );
}