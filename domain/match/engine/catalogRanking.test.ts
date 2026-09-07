import { describe, expect, it } from "vitest";
import { productCatalog } from "../../product/catalog";
import { calculateMatch } from "./calculateMatch";
import { rankProducts } from "./rankProducts";
import type { UserProfile } from "../types";

describe("Ranking do catálogo real", () => {
  it("deve gerar um ranking coerente para um perfil de cabelo cacheado", () => {
    const userProfile: UserProfile = {
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
      scentMatters: false,
    };

    const results = productCatalog.map(({ product, offer }) =>
      calculateMatch(userProfile, product, offer),
    );

    const ranking = rankProducts(results, userProfile);

    expect(productCatalog).toHaveLength(5);
    expect(ranking).toHaveLength(5);

    expect(ranking[0].score).toBeGreaterThanOrEqual(
      ranking[1].score,
    );

    expect(ranking[1].score).toBeGreaterThanOrEqual(
      ranking[2].score,
    );

    expect(ranking[2].score).toBeGreaterThanOrEqual(
      ranking[3].score,
    );

    expect(ranking[3].score).toBeGreaterThanOrEqual(
      ranking[4].score,
    );

    expect(
      results.find(
        (result) =>
          result.product.name ===
          "Meus Cachos Santo Black Poderoso - Creme de Tratamento 1kg",
      )?.level,
    ).not.toBe("nao_indicado");

    expect(
      results.find(
        (result) =>
          result.product.name ===
          "Morte Súbita - Máscara 450g",
      )?.level,
    ).not.toBe("nao_indicado");
  });
});