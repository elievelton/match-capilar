import { describe, expect, it } from "vitest";
import { calculateReputationScore } from "./calculateReputationScore";
import type { ProductProfile } from "../../product/types";

const createProduct = (
  rating?: number,
  reviewCount?: number,
): ProductProfile => ({
  name: "Produto Teste",
  brand: "Marca Teste",
  category: "mascara",
  rating,
  reviewCount,
  needs: {
    hydration: "alta",
    nutrition: "media",
    reconstruction: "baixa",
    frizzControl: "media",
    definition: "media",
    oilControl: "baixa",
    shine: "media",
    growth: "baixa",
  },
  compatibility: {
    hairPatterns: ["cacheado"],
  },
  characteristics: {
    intensity: "media",
    routineComplexity: "moderada",
    fragrance: "agradavel",
  },
});

describe("calculateReputationScore", () => {
  it("retorna 0 quando a nota não foi informada", () => {
    const product = createProduct(undefined, 1500);

    expect(calculateReputationScore(product)).toBe(0);
  });

  it("retorna 0 quando a quantidade de avaliações não foi informada", () => {
    const product = createProduct(4.8, undefined);

    expect(calculateReputationScore(product)).toBe(0);
  });

  it("retorna 0 quando não existem avaliações", () => {
    const product = createProduct(4.8, 0);

    expect(calculateReputationScore(product)).toBe(0);
  });

  it("retorna 0 para nota abaixo de 4.0", () => {
    const product = createProduct(3.9, 1500);

    expect(calculateReputationScore(product)).toBe(0);
  });

  it("retorna 0 para nota 4.0 com 1.000 ou mais avaliações", () => {
    const product = createProduct(4.0, 1000);

    expect(calculateReputationScore(product)).toBe(0);
  });

  it("calcula pontuação completa para produtos com 1.000 ou mais avaliações", () => {
    expect(
      calculateReputationScore(createProduct(4.5, 1000)),
    ).toBe(5);

    expect(
      calculateReputationScore(createProduct(4.8, 1500)),
    ).toBe(8);

    expect(
      calculateReputationScore(createProduct(5.0, 5000)),
    ).toBe(10);
  });

  it("aplica metade da pontuação para produtos com menos de 1.000 avaliações e nota entre 4.5 e 5.0", () => {
    expect(
      calculateReputationScore(createProduct(4.5, 999)),
    ).toBe(2.5);

    expect(
      calculateReputationScore(createProduct(4.8, 500)),
    ).toBe(4);

    expect(
      calculateReputationScore(createProduct(5.0, 100)),
    ).toBe(5);
  });

  it("não concede pontos para notas abaixo de 4.5 quando há menos de 1.000 avaliações", () => {
    expect(
      calculateReputationScore(createProduct(4.4, 999)),
    ).toBe(0);

    expect(
      calculateReputationScore(createProduct(4.0, 500)),
    ).toBe(0);
  });

  it("considera exatamente 1.000 avaliações como alta confiança", () => {
    const product = createProduct(4.8, 1000);

    expect(calculateReputationScore(product)).toBe(8);
  });

  it("limita notas acima de 5.0 a 5.0", () => {
    const product = createProduct(5.5, 2000);

    expect(calculateReputationScore(product)).toBe(10);
  });

  it("limita notas abaixo de 4.0 a 4.0", () => {
    const product = createProduct(3.5, 2000);

    expect(calculateReputationScore(product)).toBe(0);
  });

  it("não concede pontos para quantidade negativa de avaliações", () => {
    const product = createProduct(5.0, -10);

    expect(calculateReputationScore(product)).toBe(0);
  });
});