import { describe, expect, it } from "vitest";
import { calculateMatch } from "./calculateMatch";
import type { UserProfile } from "../types";
import type { ProductOffer } from "../../product/offer/types";
import type { ProductProfile } from "../../product/types";

const baseUser: UserProfile = {
  hairPattern: "cacheado",
  hairConditions: ["ressecamento"],
  goals: ["hidratacao"],
  chemicalTreatment: "sem_quimica_recente",
  heatExposure: "raramente",
  careRoutine: "rotina_simples",
  washFrequency: "duas_a_tres_semana",
  budget: {
    mode: "limited",
    maxAmount: 50,
  },
  recommendationStrategy: "necessidades_especificas",
};

const createProduct = (
  overrides: Partial<ProductProfile> = {},
): ProductProfile => ({
  name: "Máscara Hidratante",
  brand: "Marca Exemplo",
  category: "mascara",
  needs: {
    hydration: "alta",
    nutrition: "media",
    reconstruction: "baixa",
    frizzControl: "media",
    definition: "baixa",
    oilControl: "baixa",
    shine: "media",
    growth: "nao_indicado",
  },
  compatibility: {
    hairPatterns: ["cacheado"],
  },
  characteristics: {
    intensity: "leve",
    routineComplexity: "simples",
  },
  ...overrides,
});

const createOffer = (
  overrides: Partial<ProductOffer> = {},
): ProductOffer => ({
  productId: "product_001",
  store: "Loja Exemplo",
  price: 45,
  size: "250g",
  url: "https://exemplo.com/produto",
  available: true,
  ...overrides,
});

describe("calculateMatch", () => {
  it("deve gerar Match alto para um produto muito compatível", () => {
    const product = createProduct();
    const offer = createOffer();

    const result = calculateMatch(
      baseUser,
      product,
      offer,
    );

    expect(result.level).toBe("alta");
    expect(result.score).toBeGreaterThanOrEqual(75);
    expect(result.score).toBeLessThanOrEqual(100);
  });

  it("deve marcar como não indicado um produto incompatível com o tipo de cabelo", () => {
    const product = createProduct({
      compatibility: {
        hairPatterns: ["liso"],
      },
    });

    const result = calculateMatch(
      baseUser,
      product,
      createOffer(),
    );

    expect(result.score).toBe(0);
    expect(result.level).toBe("nao_indicado");
    expect(result.reasons).toHaveLength(1);
  });

  it("deve dividir os pontos de necessidades quando existem dois objetivos", () => {
    const user: UserProfile = {
      ...baseUser,
      goals: ["hidratacao", "controle_frizz"],
    };

    const product = createProduct({
      needs: {
        hydration: "alta",
        nutrition: "baixa",
        reconstruction: "baixa",
        frizzControl: "media",
        definition: "baixa",
        oilControl: "baixa",
        shine: "baixa",
        growth: "nao_indicado",
      },
    });

    const result = calculateMatch(
      user,
      product,
      createOffer(),
    );

    expect(result.score).toBe(82);
  });

  it("deve perder os pontos de orçamento quando a oferta ultrapassa o limite informado", () => {
    const result = calculateMatch(
      baseUser,
      createProduct(),
      createOffer({
        price: 80,
      }),
    );

    expect(result.score).toBe(77);
  });

  it("não deve eliminar o produto quando o usuário não informa o tipo de cabelo", () => {
    const user: UserProfile = {
      ...baseUser,
      hairPattern: "tipo_nao_informado",
    };

    const product = createProduct({
      compatibility: {
        hairPatterns: ["cacheado"],
      },
    });

    const result = calculateMatch(
      user,
      product,
      createOffer(),
    );

    expect(result.level).not.toBe("nao_indicado");
    expect(result.score).toBeGreaterThan(0);
  });

  it("deve considerar uma oferta indisponível como inadequada para o orçamento", () => {
    const result = calculateMatch(
      baseUser,
      createProduct(),
      createOffer({
        available: false,
      }),
    );

    expect(result.score).toBe(77);
    expect(result.reasons).not.toContainEqual({
      criterion: "orcamento",
      description:
        "A oferta está dentro do orçamento informado.",
    });
  });
});