import type { UserProfile } from "../types";
import type { MatchResult } from "./types";

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

  return [...validResults]
    .sort((a, b) => {
      // 1. Match é sempre o critério principal.
      if (a.score !== b.score) {
        return b.score - a.score;
      }

      // 2. Preço só é usado para desempatar
      // produtos com exatamente o mesmo Match.
      const aPrice = a.offer.price;
      const bPrice = b.offer.price;

      if (
        !Number.isFinite(aPrice) ||
        !Number.isFinite(bPrice) ||
        aPrice === bPrice
      ) {
        // 3. Se não houver diferença de preço,
        // preserva a ordem original.
        return 0;
      }

      // 4. Com orçamento limitado, o mais barato vence o empate.
      if (userProfile.budget.mode === "limited") {
        return aPrice - bPrice;
      }

      // 5. Sem limite ou sem informação de orçamento,
      // o mais caro vence o empate.
      return bPrice - aPrice;
    })
    .map((result) => ({
      ...result,
      score: Number(result.score.toFixed(1)),
      level: getMatchLevel(result.score),
    }));
}