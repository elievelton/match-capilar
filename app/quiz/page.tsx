"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  createUserProfile,
  type QuizAnswers,
} from "@/domain/match/createUserProfile";

type Question = {
  id: number;
  title: string;
  description?: string;
  multiple?: boolean;
  maxSelections?: number;
  options: string[];
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
  {
    id: 8,
    title: "Quanto você pretende gastar em um produto para o seu cabelo?",
    description:
      "Isso nos ajuda a encontrar opções que façam sentido para você.",
    options: [
      "Até R$ 30",
      "R$ 31 a R$ 50",
      "R$ 51 a R$ 80",
      "R$ 81 a R$ 120",
      "R$ 121 a R$ 200",
      "Não quero limitar pelo preço",
      "Prefiro não informar",
    ],
  },
  {
    id: 9,
    title: "O cheiro do produto importa para você?",
    options: [
      "Sim, gosto de produtos cheirosos",
      "Não, o cheiro não é importante para mim",
    ],
  },
];

const analysisSteps = [
  "Analisando o que seu cabelo precisa...",
  "Cruzando suas necessidades com os produtos...",
  "Encontrando os produtos que mais combinam com você...",
  "Seu Match está quase pronto...",
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const router = useRouter();
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState(0);

  const question = questions[currentQuestion];
  const selectedOptions = answers[question.id] ?? [];

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const hasAnswer = selectedOptions.length > 0;
  const isLastQuestion = currentQuestion === questions.length - 1;

  useEffect(() => {
    if (!isAnalyzing) {
      return;
    }

    const interval = window.setInterval(() => {
      setAnalysisStep((current) =>
        Math.min(current + 1, analysisSteps.length - 1),
      );
    }, 1000);

    const timeout = window.setTimeout(() => {
      const profile = createUserProfile(answers);

      sessionStorage.setItem(
        "match-capilar:user-profile",
        JSON.stringify(profile),
      );

      router.push("/resultado");
    }, 4000);

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timeout);
    };
  }, [isAnalyzing, answers, router]);

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
      setAnalysisStep(0);
      setIsAnalyzing(true);
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
    setIsAnalyzing(false);
    setAnalysisStep(0);
  };

  if (isAnalyzing) {
    return (
      <main className="min-h-screen bg-white text-zinc-900">
        <section className="mx-auto flex min-h-screen max-w-3xl items-center justify-center px-6 py-12 sm:px-10">
          <div className="w-full text-center">
            <div className="relative mx-auto mb-10 flex h-28 w-28 items-center justify-center">
              <span className="absolute inset-0 animate-ping rounded-full bg-pink-100 opacity-60" />
              <span className="absolute inset-3 animate-pulse rounded-full bg-pink-50" />

              <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-pink-600 text-2xl text-white shadow-lg shadow-pink-200">
                ✦
              </div>
            </div>

            <h1 className="text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              Analisando seu perfil
            </h1>

            <p className="mx-auto mt-4 max-w-md text-zinc-600">
              Estamos encontrando os produtos que mais combinam com as
              necessidades do seu cabelo.
            </p>

            <div className="mx-auto mt-10 max-w-sm">
              <div className="mb-3 flex justify-center gap-2">
                {analysisSteps.map((_, index) => (
                  <span
                    key={index}
                    className={`h-2 rounded-full transition-all duration-500 ${
                      index <= analysisStep
                        ? "w-8 bg-pink-600"
                        : "w-2 bg-zinc-200"
                    }`}
                  />
                ))}
              </div>

              <p
                key={analysisStep}
                className="animate-pulse text-sm font-medium text-pink-600"
              >
                {analysisSteps[analysisStep]}
              </p>
            </div>
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