import { describe, expect, it } from "vitest";
import { rankProducts } from "./rankProducts";
import type { UserProfile } from "../types";
import type { MatchResult } from "./types";

const createResult = (
  name: string,
  score: number,
  price = 45,
  level: MatchResult["level"] = "alta",
): MatchResult => ({
  product: {
    name,
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
  },
  offer: {
    productId: name,
    store: "Loja Exemplo",
    price,
    size: "250g",
    url: "https://exemplo.com/produto",
    available: true,
  },
  score,
  level,
  reasons: [],
});

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
    maxAmount: 100,
  },
  recommendationStrategy: "necessidades_especificas",
};

describe("rankProducts", () => {
  it("deve ordenar os produtos do maior para o menor Match", () => {
    const results = [
      createResult("Produto C", 72, 70, "media"),
      createResult("Produto A", 95, 90),
      createResult("Produto B", 84, 80),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(
      ranked.map((result) => result.product.name),
    ).toEqual([
      "Produto A",
      "Produto B",
      "Produto C",
    ]);
  });

  it("não deve incluir produtos não indicados no ranking", () => {
    const results = [
      createResult("Produto A", 95, 50),
      createResult(
        "Produto Incompatível",
        0,
        40,
        "nao_indicado",
      ),
      createResult("Produto B", 84, 60),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(
      ranked.map((result) => result.product.name),
    ).toEqual([
      "Produto A",
      "Produto B",
    ]);
  });

  it("deve preservar o resultado quando existe apenas um produto válido", () => {
    const results = [
      createResult("Produto A", 91, 50),
      createResult(
        "Produto Incompatível",
        0,
        40,
        "nao_indicado",
      ),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(ranked).toHaveLength(1);
    expect(ranked[0].product.name).toBe("Produto A");
  });

  it("deve retornar uma lista vazia quando nenhum produto é indicado", () => {
    const results = [
      createResult(
        "Produto A",
        0,
        50,
        "nao_indicado",
      ),
      createResult(
        "Produto B",
        0,
        60,
        "nao_indicado",
      ),
    ];

    const ranked = rankProducts(results, baseUser);

    expect(ranked).toEqual([]);
  });

  it("deve usar o preço para desempatar produtos com o mesmo Match em orçamento limitado", () => {
    const results = [
      createResult("Produto A", 80, 30),
      createResult("Produto B", 80, 50),
      createResult("Produto C", 70, 20),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "limited",
        maxAmount: 100,
      },
    });

    expect(ranked[0].product.name).toBe("Produto B");
    expect(ranked[0].score).toBe(86);

    expect(ranked[1].product.name).toBe("Produto A");
    expect(ranked[1].score).toBe(84);

    expect(ranked[2].product.name).toBe("Produto C");
    expect(ranked[2].score).toBe(70);
  });

  it("deve dar +6 somente ao produto mais caro entre produtos empatados", () => {
    const results = [
      createResult("Produto A", 80, 100),
      createResult("Produto B", 80, 150),
      createResult("Produto C", 80, 200),
      createResult("Produto D", 70, 300),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "unlimited",
      },
    });

    expect(ranked[0].product.name).toBe("Produto C");
    expect(ranked[0].score).toBe(86);

    expect(ranked[1].product.name).toBe("Produto A");
    expect(ranked[1].score).toBe(84);

    expect(ranked[2].product.name).toBe("Produto B");
    expect(ranked[2].score).toBe(84);

    expect(ranked[3].product.name).toBe("Produto D");
    expect(ranked[3].score).toBe(70);
  });

  it("deve manter o empate quando os produtos empatados possuem o mesmo preço", () => {
    const results = [
      createResult("Produto A", 80, 150),
      createResult("Produto B", 80, 150),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "unlimited",
      },
    });

    expect(ranked[0].score).toBe(86);
    expect(ranked[1].score).toBe(86);
  });

  it("deve aplicar a mesma regra quando o usuário prefere não informar o orçamento", () => {
    const results = [
      createResult("Produto A", 80, 100),
      createResult("Produto B", 80, 150),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "not_informed",
      },
    });

    expect(ranked[0].product.name).toBe("Produto B");
    expect(ranked[0].score).toBe(86);

    expect(ranked[1].product.name).toBe("Produto A");
    expect(ranked[1].score).toBe(84);
  });

  it("não deve permitir que o preço faça um Match menor ultrapassar um Match maior", () => {
    const results = [
      createResult("Produto A", 85, 100),
      createResult("Produto B", 80, 300),
    ];

    const ranked = rankProducts(results, {
      ...baseUser,
      budget: {
        mode: "unlimited",
      },
    });

    expect(ranked[0].product.name).toBe("Produto A");
    expect(ranked[0].score).toBe(85);

    expect(ranked[1].product.name).toBe("Produto B");
    expect(ranked[1].score).toBe(86);
  });
});