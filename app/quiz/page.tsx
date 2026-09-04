"use client";

import { useState } from "react";
import {
  createUserProfile,
  type QuizAnswers,
} from "@/domain/match/createUserProfile";
import type { UserProfile } from "@/domain/match/types";

type Question = {
  id: number;
  title: string;
  description?: string;
  multiple?: boolean;
  maxSelections?: number;
  options: string[];
};

type ResultProduct = {
  name: string;
  match: number;
  description: string;
  reason: string;
};

const questions: Question[] = [
  {
    id: 1,
    title: "Como você sente seus fios atualmente?",
    description: "Escolha a opção que mais representa seu cabelo hoje.",
    options: [
      "Macios e saudáveis",
      "Ressecados e ásperos",
      "Frágeis ou quebradiços",
      "Com frizz e desalinhados",
      "Porosos e com dificuldade de segurar hidratação",
      "Com aparência opaca, sem brilho",
      "Não sei dizer",
    ],
  },
  {
    id: 2,
    title: "O que você mais gostaria de melhorar no seu cabelo?",
    description: "Escolha até 2 opções.",
    multiple: true,
    maxSelections: 2,
    options: [
      "Hidratação",
      "Frizz",
      "Ressecamento",
      "Reconstrução",
      "Definição",
      "Oleosidade",
      "Brilho",
      "Crescimento",
      "Outro / não sei",
    ],
  },
  {
    id: 3,
    title: "Seu cabelo passou por algum procedimento químico recentemente?",
    options: [
      "Não",
      "Coloração / tonalizante",
      "Descoloração / mechas",
      "Alisamento / relaxamento",
      "Mais de um procedimento",
      "Não sei / prefiro não informar",
    ],
  },
  {
    id: 4,
    title: "Você usa ferramentas de calor no cabelo com frequência?",
    description:
      "Ex.: secador, chapinha, modelador/babyliss ou outras ferramentas que aquecem os fios.",
    options: [
      "Não uso",
      "Raramente",
      "Às vezes",
      "Frequentemente",
      "Quase todos os dias",
    ],
  },
  {
    id: 5,
    title: "Como é sua rotina de cuidados com o cabelo?",
    options: [
      "Prática — prefiro poucos produtos e uma rotina simples",
      "Moderada — uso alguns produtos e tenho uma rotina regular",
      "Completa — gosto de cuidar bastante e usar diferentes produtos",
      "Não tenho uma rotina definida",
    ],
  },
  {
    id: 6,
    title: "Com que frequência você costuma lavar o cabelo?",
    options: [
      "Todos os dias",
      "Dia sim, dia não",
      "2 a 3 vezes por semana",
      "1 vez por semana",
      "Menos de 1 vez por semana",
      "Varia bastante",
    ],
  },
  {
    id: 7,
    title: "Como você descreveria o formato natural do seu cabelo?",
    options: [
      "Liso",
      "Ondulado",
      "Cacheado",
      "Crespo",
      "Mais de um padrão",
      "Não sei dizer",
    ],
  },
];

const resultProducts: ResultProduct[] = [
  {
    name: "Máscara Hidra Match",
    match: 94,
    description:
      "Tratamento focado em hidratação e maciez para fios que precisam recuperar o toque saudável.",
    reason: "Combina com as necessidades de hidratação e cuidado dos seus fios.",
  },
  {
    name: "Leave-in Controle Match",
    match: 89,
    description:
      "Finalizador pensado para ajudar no controle do frizz e deixar os fios mais alinhados.",
    reason: "Pode fazer sentido para uma rotina que busca mais controle e praticidade.",
  },
  {
    name: "Tratamento Repair Match",
    match: 84,
    description:
      "Tratamento desenvolvido para uma rotina de cuidado voltada a fios fragilizados.",
    reason: "É uma opção compatível com necessidades de recuperação e fortalecimento.",
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [showResults, setShowResults] = useState(false);

  const question = questions[currentQuestion];
  const selectedOptions = answers[question.id] ?? [];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = selectedOptions.length > 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  const handleOptionClick = (option: string) => {
    if (question.multiple) {
      const alreadySelected = selectedOptions.includes(option);

      if (alreadySelected) {
        setAnswers((current) => ({
          ...current,
          [question.id]: selectedOptions.filter(
            (selected) => selected !== option,
          ),
        }));

        return;
      }

      if (
        question.maxSelections &&
        selectedOptions.length >= question.maxSelections
      ) {
        return;
      }

      setAnswers((current) => ({
        ...current,
        [question.id]: [...selectedOptions, option],
      }));

      return;
    }

    setAnswers((current) => ({
      ...current,
      [question.id]: [option],
    }));
  };

  const handleContinue = () => {
    if (!hasAnswer) {
      return;
    }

    if (isLastQuestion) {
      const profile = createUserProfile(answers);

      setUserProfile(profile);
      setShowResults(true);

      console.log("UserProfile:", profile);

      return;
    }

    setCurrentQuestion((current) => current + 1);
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((current) => current - 1);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setUserProfile(null);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <main className="min-h-screen bg-zinc-50 text-zinc-900">
        <section className="mx-auto max-w-5xl px-6 py-12 sm:px-10 sm:py-16">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-pink-600">
              Seu resultado
            </span>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-5xl">
              Encontramos produtos que combinam com você.
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-zinc-600">
              Com base nas suas respostas, encontramos algumas opções
              compatíveis com as necessidades que você contou.
            </p>
          </div>

          {userProfile && (
            <div className="mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-4 text-left text-sm text-zinc-600 shadow-sm ring-1 ring-zinc-100">
              <p className="font-semibold text-zinc-900">
                Perfil identificado
              </p>

              <p className="mt-2">
                Tipo de cabelo: {userProfile.hairPattern}
              </p>

              <p>
                Estratégia: {userProfile.recommendationStrategy}
              </p>
            </div>
          )}

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {resultProducts.map((product) => (
              <article
                key={product.name}
                className="flex flex-col rounded-3xl bg-white p-6 shadow-sm ring-1 ring-zinc-100"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-sm font-semibold text-pink-700">
                    {product.match}% Match
                  </span>
                </div>

                <div className="mt-8 flex aspect-square items-center justify-center rounded-2xl bg-gradient-to-br from-pink-50 via-white to-rose-50">
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-pink-100 text-4xl">
                    ♡
                  </div>
                </div>

                <h2 className="mt-6 text-xl font-semibold text-zinc-950">
                  {product.name}
                </h2>

                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  {product.description}
                </p>

                <div className="mt-5 rounded-2xl bg-zinc-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-zinc-500">
                    Por que apareceu?
                  </p>

                  <p className="mt-2 text-sm leading-6 text-zinc-700">
                    {product.reason}
                  </p>
                </div>

                <button
                  type="button"
                  className="mt-6 rounded-full border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 transition hover:border-pink-300 hover:bg-pink-50"
                >
                  Conhecer produto
                </button>
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={handleRestart}
              className="rounded-full px-6 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-white hover:text-zinc-900"
            >
              Refazer meu Match
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-zinc-900">
      <section className="mx-auto max-w-3xl px-6 py-12 sm:px-10 sm:py-16">
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-medium text-pink-600">
              Pergunta {currentQuestion + 1} de {questions.length}
            </span>

            {question.multiple && (
              <span className="text-sm text-zinc-500">
                {selectedOptions.length} de {question.maxSelections}
              </span>
            )}
          </div>

          <div className="mt-4 h-2 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-pink-600 transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mt-14 sm:mt-16">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {question.title}
          </h1>

          {question.description && (
            <p className="mt-3 text-zinc-600">{question.description}</p>
          )}

          <div className="mt-8 grid gap-3">
            {question.options.map((option) => {
              const isSelected = selectedOptions.includes(option);

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionClick(option)}
                  aria-pressed={isSelected}
                  className={`w-full rounded-2xl border px-5 py-4 text-left transition ${
                    isSelected
                      ? "border-pink-600 bg-pink-50 text-pink-900 ring-2 ring-pink-100"
                      : "border-zinc-200 bg-white hover:border-pink-400 hover:bg-pink-50"
                  }`}
                >
                  <span className="flex items-center justify-between gap-4">
                    <span>{option}</span>

                    {isSelected && (
                      <span
                        aria-hidden="true"
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-pink-600 text-sm text-white"
                      >
                        ✓
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-8 flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="rounded-full px-6 py-3 text-sm font-semibold text-zinc-600 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-30"
            >
              ← Voltar
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={!hasAnswer}
              className="rounded-full bg-pink-600 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-pink-200 transition hover:bg-pink-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
            >
              {isLastQuestion ? "Ver meu resultado" : "Continuar"}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}