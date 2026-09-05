import Link from "next/link";
import HowItWorks from "@/components/HowItWorks";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="relative overflow-hidden">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center px-6 py-16 sm:px-10 lg:px-12">
          <div className="grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-pink-50 px-4 py-2 text-sm font-medium text-pink-700">
                Match Capilar
              </span>

              <h1 className="mt-6 text-5xl font-semibold tracking-tight text-zinc-950 sm:text-6xl lg:text-7xl">
                Seu cabelo tem necessidades.
                <span className="block text-pink-600">
                  A gente encontra o match.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-600 sm:text-xl">
                Conte o que está acontecendo com seu cabelo, o que você quer
                melhorar e encontre produtos que combinam com o seu momento.
              </p>

              <div className="mt-8">
                <Link
                  href="/quiz"
                  className="inline-flex rounded-full bg-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 hover:shadow-xl"
                >
                  Começar meu Match
                </Link>
              </div>

              <p className="mt-4 text-sm text-zinc-500">
                Sem cadastro para começar.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-pink-200/60 blur-3xl" />
              <div className="absolute -right-8 bottom-10 h-48 w-48 rounded-full bg-rose-100 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-pink-100 via-white to-rose-50 p-5 shadow-2xl shadow-pink-100">
                <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden rounded-[2rem] bg-white">
                  <div className="absolute left-8 top-8 h-24 w-24 rounded-full bg-pink-200/50" />
                  <div className="absolute bottom-10 right-8 h-32 w-32 rounded-full bg-rose-200/40" />

                  <div className="relative flex flex-col items-center">
                    <div className="flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 via-rose-400 to-pink-700 shadow-2xl shadow-pink-300">
                      <span className="text-7xl">💚</span>
                    </div>

                    <div className="mt-8 rounded-2xl border border-pink-100 bg-white px-6 py-4 text-center shadow-lg">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-pink-500">
                        Seu resultado
                      </p>

                      <p className="mt-1 text-2xl font-semibold text-zinc-900">
                        Deu Match!
                      </p>

                      <p className="mt-1 text-sm text-zinc-500">
                        Produtos que combinam com você
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <HowItWorks />
    </main>
  );
}