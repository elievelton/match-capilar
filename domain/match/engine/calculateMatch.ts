import type { ProductOffer } from "../../product/offer/types";
import type { ProductProfile } from "../../product/types";
import type { UserProfile } from "../types";
import type { MatchResult } from "./types";
import { calculateReputationScore } from "./calculateReputationScore";

const NEED_SCORE = {
  alta: 1,
  media: 2 / 3,
  baixa: 1 / 3,
  nao_indicado: 0,
} as const;

function calculateNeedScore(
  userProfile: UserProfile,
  product: ProductProfile,
): number {
  const goals = userProfile.goals.filter(
    (goal) => goal !== "sem_necessidade_definida",
  );

  if (goals.length === 0) {
    return 30;
  }

  const scorePerGoal = 30 / goals.length;

  return goals.reduce((total, goal) => {
    const level = getProductNeedLevel(goal, product);

    return total + scorePerGoal * NEED_SCORE[level];
  }, 0);
}

function getProductNeedLevel(
  goal: UserProfile["goals"][number],
  product: ProductProfile,
): keyof typeof NEED_SCORE {
  switch (goal) {
    case "hidratacao":
      return product.needs.hydration;

    case "controle_frizz":
      return product.needs.frizzControl;

    case "ressecamento":
      return product.needs.hydration;

    case "reconstrucao":
      return product.needs.reconstruction;

    case "definicao":
      return product.needs.definition;

    case "controle_oleosidade":
      return product.needs.oilControl;

    case "brilho":
      return product.needs.shine;

    case "crescimento":
      return product.needs.growth;

    case "sem_necessidade_definida":
      return "nao_indicado";
  }
}

/**
 * Usa as condições do cabelo apenas quando elas representam
 * uma necessidade que ainda não foi considerada nos objetivos.
 *
 * Isso evita dupla contagem.
 */
function calculateConditionScore(
  userProfile: UserProfile,
  product: ProductProfile,
): number {
  const conditions = userProfile.hairConditions.filter(
    (condition) =>
      condition !== "saudavel" &&
      condition !== "sem_sinal_definido",
  );

  if (conditions.length === 0) {
    return 0;
  }

  const primaryNeeds = new Set(
    userProfile.goals
      .map((goal) => {
        switch (goal) {
          case "hidratacao":
          case "ressecamento":
            return "hydration";

          case "controle_frizz":
            return "frizzControl";

          case "reconstrucao":
            return "reconstruction";

          case "definicao":
            return "definition";

          case "controle_oleosidade":
            return "oilControl";

          case "brilho":
            return "shine";

          case "crescimento":
            return "growth";

          default:
            return null;
        }
      })
      .filter(Boolean),
  );

  let total = 0;

  for (const condition of conditions) {
    let need: keyof ProductProfile["needs"] | null = null;

    switch (condition) {
      case "ressecamento":
      case "baixa_retencao_hidratacao":
        need = "hydration";
        break;

      case "frizz":
        need = "frizzControl";
        break;

      case "falta_de_brilho":
        need = "shine";
        break;

      case "fragilidade":
        need = "reconstruction";
        break;

      case "porosidade":
        // Ainda não existe um atributo específico
        // de porosidade no ProductProfile.
        need = null;
        break;
    }

    // Evita contar novamente uma necessidade
    // que já foi considerada como objetivo.
    if (!need || primaryNeeds.has(need)) {
      continue;
    }

    total += NEED_SCORE[product.needs[need]];
  }

  if (total === 0) {
    return 0;
  }

  return (total / conditions.length) * 5;
}

function calculateChemicalScore(
  userProfile: UserProfile,
  product: ProductProfile,
): number {
  if (
    userProfile.chemicalTreatment === "sem_quimica_recente"
  ) {
    return 0;
  }

  const reconstruction = product.needs.reconstruction;

  if (reconstruction === "alta") {
    return 5;
  }

  if (reconstruction === "media") {
    return 3;
  }

  if (reconstruction === "baixa") {
    return 1;
  }

  return 0;
}

function calculateHeatScore(
  userProfile: UserProfile,
  product: ProductProfile,
): number {
  if (
    userProfile.heatExposure === "nao_usa" ||
    userProfile.heatExposure === "raramente"
  ) {
    return 0;
  }

  const reconstruction = product.needs.reconstruction;

  if (
    userProfile.heatExposure === "quase_todos_os_dias"
  ) {
    if (reconstruction === "alta") {
      return 4;
    }

    if (reconstruction === "media") {
      return 2.5;
    }

    return 0;
  }

  if (reconstruction === "alta") {
    return 3;
  }

  if (reconstruction === "media") {
    return 2;
  }

  return 0;
}

function calculateRoutineScore(
  userProfile: UserProfile,
  product: ProductProfile,
): number {
  const routine = userProfile.careRoutine;
  const complexity = product.characteristics.routineComplexity;

  if (routine === "rotina_indefinida") {
    return 7;
  }

  if (
    routine === "rotina_simples" &&
    complexity === "simples"
  ) {
    return 10;
  }

  if (
    routine === "rotina_moderada" &&
    complexity === "moderada"
  ) {
    return 10;
  }

  if (
    routine === "rotina_completa" &&
    complexity === "complexa"
  ) {
    return 10;
  }

  if (
    routine === "rotina_simples" &&
    complexity === "moderada"
  ) {
    return 7;
  }

  if (
    routine === "rotina_moderada" &&
    complexity === "simples"
  ) {
    return 7;
  }

  if (
    routine === "rotina_moderada" &&
    complexity === "complexa"
  ) {
    return 5;
  }

  if (
    routine === "rotina_completa" &&
    complexity === "moderada"
  ) {
    return 8;
  }

  return 3;
}

function calculateIntensityScore(): number {
  return 7;
}

function calculateBudgetScore(
  userProfile: UserProfile,
  offer: ProductOffer,
): number {
  if (!offer.available) {
    return 0;
  }

  if (userProfile.budget.mode !== "limited") {
    return 10;
  }

  if (offer.price <= userProfile.budget.maxAmount) {
    return 10;
  }

  return 0;
}

function calculateScentScore(
  userProfile: UserProfile,
  product: ProductProfile,
): number {
  if (!userProfile.scentMatters) {
    return 0;
  }

  if (product.characteristics.fragrance === "neutro") {
    return -2;
  }

  return 0;
}

function getMatchLevel(
  score: number,
): MatchResult["level"] {
  if (score >= 75) {
    return "alta";
  }

  if (score >= 50) {
    return "media";
  }

  return "baixa";
}

export function calculateMatch(
  userProfile: UserProfile,
  product: ProductProfile,
  offer: ProductOffer,
): MatchResult {
  const isCompatible =
    userProfile.hairPattern === "tipo_nao_informado" ||
    product.compatibility.hairPatterns.includes(
      userProfile.hairPattern,
    );

  if (!isCompatible) {
    return {
      product,
      offer,
      score: 0,
      level: "nao_indicado",
      reasons: [
        {
          criterion: "tipo_de_cabelo",
          description:
            "O produto não é indicado para o tipo de cabelo informado.",
        },
      ],
    };
  }

  const needScore = calculateNeedScore(
    userProfile,
    product,
  );

  const conditionScore = calculateConditionScore(
    userProfile,
    product,
  );

  const chemicalScore = calculateChemicalScore(
    userProfile,
    product,
  );

  const heatScore = calculateHeatScore(
    userProfile,
    product,
  );

  const routineScore = calculateRoutineScore(
    userProfile,
    product,
  );

  const intensityScore = calculateIntensityScore();

  const budgetScore = calculateBudgetScore(
    userProfile,
    offer,
  );

  const reputationScore = calculateReputationScore(
    product,
  );

  const scentScore = calculateScentScore(
    userProfile,
    product,
  );

  const score = Math.min(
    100,
    Number(
      (
        30 +
        needScore +
        conditionScore +
        chemicalScore +
        heatScore +
        routineScore +
        intensityScore +
        budgetScore +
        reputationScore +
        scentScore
      ).toFixed(1),
    ),
  );

  const reasons: MatchResult["reasons"] = [
    {
      criterion: "tipo_de_cabelo",
      description:
        "O produto é compatível com o seu tipo de cabelo.",
    },
  ];

  if (needScore > 0) {
    reasons.push({
      criterion: "necessidades",
      description:
        "O produto atende às necessidades informadas no quiz.",
    });
  }

  if (conditionScore > 0) {
    reasons.push({
      criterion: "condicoes",
      description:
        "As características do produto também combinam com as condições informadas para o seu cabelo.",
    });
  }

  if (chemicalScore >= 3) {
    reasons.push({
      criterion: "quimica",
      description:
        "O perfil do produto apresenta características compatíveis com o contexto químico informado.",
    });
  }

  if (heatScore >= 2) {
    reasons.push({
      criterion: "calor",
      description:
        "O perfil do produto apresenta características relacionadas ao contexto de exposição ao calor informado.",
    });
  }

  if (routineScore >= 8) {
    reasons.push({
      criterion: "rotina",
      description:
        "A complexidade da rotina do produto combina com a rotina informada.",
    });
  }

  if (budgetScore === 10) {
    reasons.push({
      criterion: "orcamento",
      description:
        "A oferta está dentro do orçamento informado.",
    });
  }

  if (reputationScore > 0) {
    reasons.push({
      criterion: "reputacao",
      description:
        "A avaliação e a quantidade de avaliações do produto contribuem positivamente para sua reputação.",
    });
  }

  if (scentScore < 0) {
    reasons.push({
      criterion: "fragrancia",
      description:
        "Você informou que o cheiro do produto é importante, e este produto possui fragrância neutra.",
    });
  }

  return {
    product,
    offer,
    score,
    level: getMatchLevel(score),
    reasons,
  };
}