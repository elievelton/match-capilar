import type { UserProfile } from "../types";
import type { MatchResult } from "./types";

const MAX_PRICE_SCORE = 6;
const TIED_PRICE_SCORE = 4;

function calculatePriceScores(
  results: MatchResult[],
  userProfile: UserProfile,
): Map<string, number> {
  const priceScores = new Map<string, number>();

  const availableResults = results
    .filter(
      (result) =>
        result.offer.available &&
        Number.isFinite(result.offer.price) &&
        result.offer.price > 0,
    );

  if (availableResults.length === 0) {
    return priceScores;
  }

  // Quando o preço não limita a recomendação,
  // o preço será usado somente como desempate.
  if (userProfile.budget.mode !== "limited") {
    for (const result of availableResults) {
      priceScores.set(result.offer.productId, TIED_PRICE_SCORE);
    }

    return priceScores;
  }

  // Em orçamento limitado, somente produtos dentro
  // do orçamento participam do ranking de preço.
  const affordableResults = availableResults
    .filter(
      (result) =>
        userProfile.budget.mode === "limited" &&
        result.offer.price <= userProfile.budget.maxAmount,
    )
    .sort((a, b) => a.offer.price - b.offer.price);

  let previousPrice: number | null = null;
  let currentScore = MAX_PRICE_SCORE;

  for (const result of affordableResults) {
    const price = result.offer.price;

    if (previousPrice !== null && price !== previousPrice) {
      currentScore = Math.max(1, currentScore - 1);
    }

    priceScores.set(result.offer.productId, currentScore);
    previousPrice = price;
  }

  return priceScores;
}

function getMatchLevel(score: number): MatchResult["level"] {
  if (score >= 80) {
    return "alta";
  }

  if (score >= 60) {
    return "media";
  }

  if (score > 0) {
    return "baixa";
  }

  return "nao_indicado";
}

export function rankProducts(
  results: MatchResult[],
  userProfile: UserProfile,
): MatchResult[] {
  const validResults = results.filter(
    (result) => result.level !== "nao_indicado",
  );

  const priceScores = calculatePriceScores(
    validResults,
    userProfile,
  );

  return [...validResults].sort((a, b) => {
    // 1. Match sempre é o critério principal.
    if (a.score !== b.score) {
      return b.score - a.score;
    }

    // 2. Só usamos preço quando existe empate de Match.
    if (userProfile.budget.mode !== "limited") {
      const aPrice = a.offer.price;
      const bPrice = b.offer.price;

      if (
        Number.isFinite(aPrice) &&
        Number.isFinite(bPrice) &&
        aPrice !== bPrice
      ) {
        return bPrice - aPrice;
      }
    }

    // 3. Se ainda houver empate, preservamos a ordem original.
    return 0;
  }).map((result) => {
    const tieBreakScore = priceScores.get(result.offer.productId);

    // O score do Match NÃO é alterado.
    // O valor de desempate existe apenas internamente
    // para representar a prioridade de preço.
    void tieBreakScore;

    return {
      ...result,
      score: Number(result.score.toFixed(1)),
      level: getMatchLevel(result.score),
    };
  });
}