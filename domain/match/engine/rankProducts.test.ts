import { describe, expect, it } from "vitest";

import { rankProducts } from "./rankProducts";

import type { UserProfile } from "../types";
import type { MatchResult } from "./types";
import type { ProductOffer } from "../../product/offer/types";
import type { ProductProfile } from "../../product/types";

const baseUser: UserProfile = {
  hairPattern: "cacheado",
  hairConditions: ["ressecamento"],
  goals: ["hidratacao"],
  chemicalTreatment: "sem_quimica_recente",
  heatExposure: "nao_usa",
  careRoutine: "rotina_moderada",
  washFrequency: "duas_a_tres_semana",
  budget: {
    mode: "limited",
    maxAmount: 100,
  },
  scentMatters: false,
  recommendationStrategy: "necessidades_especificas",
};

function createProduct(name: string): ProductProfile {
  return {
    id: name.toLowerCase().replace(/\s+/g, "-"),
    name,
    brand: "Marca Teste",
    category: "mascara",
    needs: {
      hydration: "alta",
      nutrition: "alta",
      reconstruction: "media",
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
  };
}

function createResult(
  name: string,
  score: number,
  price: number,
  level: MatchResult["level"] = "alta",
): MatchResult {
  const product = createProduct(name);

  const offer: ProductOffer = {
    productId: product.id ?? "",
    store: "Loja Teste",
    price,
    size: "300ml",
    url: "https://example.com/produto",
    available: true,
  };

  return {
    product,
    offer,
    score,
    level,
    reasons: [],
  };
}

describe("rankProducts", () => {
  it("deve ordenar os produtos do maior para o menor Match", () => {
    const results = [
      createResult("Produto A", 70, 40),
      createResult("Produto B", 90, 60),
      createResult("Produto C", 80, 50),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(ranked.map((result) => result.product.name)).toEqual([
      "Produto B",
      "Produto C",
      "Produto A",
    ]);

    expect(ranked.map((result) => result.score)).toEqual([
      90,
      80,
      70,
    ]);
  });

  it("não deve incluir produtos não indicados no ranking", () => {
    const results = [
      createResult("Produto A", 90, 40),
      createResult("Produto B", 0, 30, "nao_indicado"),
      createResult("Produto C", 70, 50),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(ranked.map((result) => result.product.name)).toEqual([
      "Produto A",
      "Produto C",
    ]);
  });

  it("deve preservar o resultado quando existe apenas um produto válido", () => {
    const results = [
      createResult("Produto A", 85, 40),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(ranked).toHaveLength(1);
    expect(ranked[0].product.name).toBe("Produto A");
    expect(ranked[0].score).toBe(85);
  });

  it("deve retornar uma lista vazia quando nenhum produto é indicado", () => {
    const results = [
      createResult("Produto A", 0, 40, "nao_indicado"),
      createResult("Produto B", 0, 50, "nao_indicado"),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(ranked).toEqual([]);
  });

  it("deve usar o preço apenas para desempatar produtos com o mesmo Match em orçamento limitado", () => {
    const results = [
      createResult("Produto A", 80, 50),
      createResult("Produto B", 80, 40),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "limited",
        maxAmount: 100,
      },
    });

    expect(ranked[0].product.name).toBe("Produto B");
    expect(ranked[1].product.name).toBe("Produto A");

    expect(ranked[0].score).toBe(80);
    expect(ranked[1].score).toBe(80);
  });

  it("não deve alterar o Match ao usar o preço como desempate", () => {
    const results = [
      createResult("Produto A", 80, 40),
      createResult("Produto B", 80, 100),
      createResult("Produto C", 80, 70),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "limited",
        maxAmount: 100,
      },
    });

    expect(ranked.map((result) => result.product.name)).toEqual([
      "Produto A",
      "Produto C",
      "Produto B",
    ]);

    expect(ranked.map((result) => result.score)).toEqual([
      80,
      80,
      80,
    ]);
  });

  it("deve manter o empate quando os produtos empatados possuem o mesmo preço", () => {
    const results = [
      createResult("Produto A", 80, 50),
      createResult("Produto B", 80, 50),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "limited",
        maxAmount: 100,
      },
    });

    expect(ranked[0].product.name).toBe("Produto A");
    expect(ranked[1].product.name).toBe("Produto B");

    expect(ranked[0].score).toBe(80);
    expect(ranked[1].score).toBe(80);
  });

  it("deve usar o produto mais caro como desempate quando o orçamento não é informado", () => {
    const results = [
      createResult("Produto A", 80, 40),
      createResult("Produto B", 80, 70),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "not_informed",
      },
    });

    expect(ranked[0].product.name).toBe("Produto B");
    expect(ranked[1].product.name).toBe("Produto A");

    expect(ranked[0].score).toBe(80);
    expect(ranked[1].score).toBe(80);
  });

  it("não deve permitir que o preço faça um Match menor ultrapassar um Match maior", () => {
    const results = [
      createResult("Produto A", 85, 40),
      createResult("Produto B", 80, 100),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "limited",
        maxAmount: 100,
      },
    });

    expect(ranked[0].product.name).toBe("Produto A");
    expect(ranked[1].product.name).toBe("Produto B");

    expect(ranked[0].score).toBe(85);
    expect(ranked[1].score).toBe(80);
  });
});