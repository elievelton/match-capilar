import { describe, expect, it } from "vitest";
import { calculateReputationScore } from "./calculateReputationScore";
import type { ProductProfile } from "../../product/types";

const baseProduct: ProductProfile = {
  name: "Produto de teste",
  brand: "Marca de teste",
  category: "mascara",
  needs: {
    hydration: "alta",
    nutrition: "media",
    reconstruction: "baixa",
    frizzControl: "alta",
    definition: "media",
    oilControl: "nao_indicado",
    shine: "alta",
    growth: "nao_indicado",
  },
  compatibility: {
    hairPatterns: ["ondulado", "cacheado"],
  },
  characteristics: {
    intensity: "media",
    routineComplexity: "simples",
  },
};

describe("calculateReputationScore", () => {
  it("deve dar a pontuação integral para produtos com 1.000 ou mais avaliações", () => {
    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.9,
        reviewCount: 2000,
      }),
    ).toBe(9);

    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.8,
        reviewCount: 1000,
      }),
    ).toBe(8);

    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.5,
        reviewCount: 5000,
      }),
    ).toBe(5);
  });

  it("deve dar metade dos pontos para notas promissoras com menos de 1.000 avaliações", () => {
    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.9,
        reviewCount: 800,
      }),
    ).toBe(4.5);

    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.8,
        reviewCount: 500,
      }),
    ).toBe(4);

    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.5,
        reviewCount: 100,
      }),
    ).toBe(2.5);
  });

  it("não deve dar pontos para notas abaixo de 4.5 quando há menos de 1.000 avaliações", () => {
    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.4,
        reviewCount: 800,
      }),
    ).toBe(0);

    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 3.9,
        reviewCount: 2000,
      }),
    ).toBe(0);
  });

  it("deve aceitar exatamente 1.000 avaliações como amostragem confiável", () => {
    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.9,
        reviewCount: 1000,
      }),
    ).toBe(9);
  });

  it("deve retornar zero quando os dados de reputação não existem", () => {
    expect(
      calculateReputationScore(baseProduct),
    ).toBe(0);
  });

  it("deve retornar zero quando a quantidade de avaliações é inválida", () => {
    expect(
      calculateReputationScore({
        ...baseProduct,
        rating: 4.9,
        reviewCount: 0,
      }),
    ).toBe(0);
  });
});