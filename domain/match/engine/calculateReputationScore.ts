import type { ProductProfile } from "../../product/types";

/**
 * Calcula os pontos de reputação do produto.
 *
 * Regras:
 *
 * - 1.000 ou mais avaliações:
 *   a nota de 4.0 a 5.0 gera de 0 a 10 pontos.
 *
 * - Menos de 1.000 avaliações:
 *   notas de 4.5 a 4.9 recebem metade da pontuação.
 *
 * - Notas abaixo de 4.5 não geram pontos.
 *
 * A quantidade de avaliações funciona como fator de confiança,
 * mas não supera uma nota significativamente melhor.
 */
export function calculateReputationScore(
  product: ProductProfile,
): number {
  const { rating, reviewCount } = product;

  if (
    rating === undefined ||
    reviewCount === undefined ||
    reviewCount <= 0
  ) {
    return 0;
  }

  if (rating < 4.0) {
    return 0;
  }

  const normalizedRating = Math.min(5, Math.max(4, rating));

  const baseScore = Math.round(
    (normalizedRating - 4) * 10,
  );

  if (reviewCount >= 1000) {
    return baseScore;
  }

  if (normalizedRating >= 4.5) {
    return baseScore / 2;
  }

  return 0;
}