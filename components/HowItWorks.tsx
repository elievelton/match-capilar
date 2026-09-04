const steps = [
  {
    number: "01",
    title: "Você conta",
    description: "Responda algumas perguntas sobre seu cabelo e o que você deseja melhorar.",
  },
  {
    number: "02",
    title: "A gente encontra",
    description: "Nosso sistema analisa suas respostas e encontra produtos compatíveis com seu perfil.",
  },
  {
    number: "03",
    title: "Você escolhe",
    description: "Conheça seus Matches e encontre opções de compra em lojas e parceiros.",
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-zinc-50 px-6 py-24 sm:px-10 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-pink-600">
            Como funciona
          </span>

          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Encontrar seu Match pode ser simples.
          </h2>

          <p className="mt-4 text-lg leading-8 text-zinc-600">
            Você conta o que seu cabelo precisa. A gente faz o trabalho de
            encontrar produtos que combinam com você.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-zinc-100"
            >
              <span className="text-sm font-semibold text-pink-600">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-zinc-950">
                {step.title}
              </h3>

              <p className="mt-3 leading-7 text-zinc-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
          <div className="mt-16 text-center">
  <h3 className="text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
    Pronta para descobrir seus Matches?
  </h3>

  <p className="mx-auto mt-3 max-w-xl text-zinc-600">
    Responda algumas perguntas e encontre produtos que combinam com as
    necessidades do seu cabelo.
  </p>

  <button
    type="button"
    className="mt-6 rounded-full bg-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 hover:shadow-xl"
  >
    Começar meu Match
  </button>
</div>
      </div>
    </section>
  );
}