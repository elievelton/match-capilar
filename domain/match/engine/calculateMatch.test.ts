import { describe, expect, it } from "vitest";

import { calculateMatch } from "./calculateMatch";

import type { UserProfile } from "../types";
import type { ProductOffer } from "../../product/offer/types";
import type {
  ProductProfile,
  ProductCharacteristics,
} from "../../product/types";

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
    maxAmount: 50,
  },
  scentMatters: false,
  recommendationStrategy: "necessidades_especificas",
};

const baseCharacteristics: ProductCharacteristics = {
  intensity: "media",
  routineComplexity: "moderada",
  fragrance: "agradavel",
};

function createProduct(
  overrides: Partial<ProductProfile> = {},
): ProductProfile {
  return {
    id: "produto-1",
    name: "Produto Teste",
    brand: "Marca Teste",
    category: "mascara",
    characteristics: {
      ...baseCharacteristics,
      ...overrides.characteristics,
    },
    compatibility: {
      hairPatterns: ["cacheado"],
    },
    needs: {
        nutrition: "alta",
      hydration: "alta",
      frizzControl: "media",
      reconstruction: "baixa",
      definition: "media",
      oilControl: "baixa",
      shine: "media",
      growth: "baixa",
    },
    ...overrides,
  };
}

function createOffer(
  overrides: Partial<ProductOffer> = {},
): ProductOffer {
  return {
    productId: "produto-1",
    store: "Loja Teste",
    price: 40,
    size: "300ml",
    url: "https://example.com/produto",
    available: true,
    ...overrides,
  };
}

describe("calculateMatch", () => {
  it("deve calcular um Match positivo para produto compatível", () => {
    const product = createProduct();
    const offer = createOffer();

    const result = calculateMatch(baseUser, product, offer);

    expect(result.score).toBeGreaterThan(0);
    expect(result.level).toBe("alta");
    expect(result.product).toBe(product);
    expect(result.offer).toBe(offer);
  });

  it("deve considerar o tipo de cabelo na compatibilidade", () => {
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
  });

  it("deve permitir o produto quando o tipo de cabelo não foi informado", () => {
    const user: UserProfile = {
      ...baseUser,
      hairPattern: "tipo_nao_informado",
    };

    const product = createProduct({
      compatibility: {
        hairPatterns: ["liso"],
      },
    });

    const result = calculateMatch(
      user,
      product,
      createOffer(),
    );

    expect(result.score).toBeGreaterThan(0);
    expect(result.level).not.toBe("nao_indicado");
  });

  it("deve considerar o orçamento quando a oferta está dentro do limite", () => {
    const product = createProduct();

    const result = calculateMatch(
      baseUser,
      product,
      createOffer({ price: 40 }),
    );

    expect(result.reasons).toContainEqual({
      criterion: "orcamento",
      description: "A oferta está dentro do orçamento informado.",
    });
  });

  it("não deve considerar positivamente o orçamento quando a oferta ultrapassa o limite", () => {
    const product = createProduct();

    const result = calculateMatch(
      baseUser,
      product,
      createOffer({ price: 60 }),
    );

    expect(result.reasons).not.toContainEqual({
      criterion: "orcamento",
      description: "A oferta está dentro do orçamento informado.",
    });
  });

  it("deve considerar reputação quando o produto possui boa avaliação e muitas avaliações", () => {
    const product = createProduct({
      rating: 4.8,
      reviewCount: 2000,
    });

    const result = calculateMatch(
      baseUser,
      product,
      createOffer(),
    );

    expect(result.reasons).toContainEqual({
      criterion: "reputacao",
      description:
        "A avaliação e a quantidade de avaliações do produto contribuem positivamente para sua reputação.",
    });
  });

  it("não deve penalizar fragrância quando o cheiro não importa para o usuário", () => {
    const user: UserProfile = {
      ...baseUser,
      scentMatters: false,
    };

    const product = createProduct({
      characteristics: {
        ...baseCharacteristics,
        fragrance: "neutro",
      },
    });

    const result = calculateMatch(
      user,
      product,
      createOffer(),
    );

    const pleasantProduct = createProduct({
      characteristics: {
        ...baseCharacteristics,
        fragrance: "agradavel",
      },
    });

    const pleasantResult = calculateMatch(
      user,
      pleasantProduct,
      createOffer(),
    );

    expect(result.score).toBe(pleasantResult.score);
    expect(result.reasons).not.toContainEqual({
      criterion: "fragrancia",
      description:
        "Você informou que o cheiro do produto é importante, e este produto possui fragrância neutra.",
    });
  });

  it("deve penalizar fragrância neutra quando o cheiro importa para o usuário", () => {
    const user: UserProfile = {
      ...baseUser,
      scentMatters: true,
    };

    const neutralProduct = createProduct({
      characteristics: {
        ...baseCharacteristics,
        fragrance: "neutro",
      },
    });

    const pleasantProduct = createProduct({
      characteristics: {
        ...baseCharacteristics,
        fragrance: "agradavel",
      },
    });

    const neutralResult = calculateMatch(
      user,
      neutralProduct,
      createOffer(),
    );

    const pleasantResult = calculateMatch(
      user,
      pleasantProduct,
      createOffer(),
    );

    expect(neutralResult.score).toBe(
      pleasantResult.score - 2,
    );

    expect(neutralResult.reasons).toContainEqual({
      criterion: "fragrancia",
      description:
        "Você informou que o cheiro do produto é importante, e este produto possui fragrância neutra.",
    });
  });

  it("deve manter o score em uma escala máxima de 100", () => {
    const user: UserProfile = {
      ...baseUser,
      scentMatters: true,
    };

    const product = createProduct({
      rating: 5,
      reviewCount: 5000,
      characteristics: {
        ...baseCharacteristics,
        fragrance: "agradavel",
      },
      needs: {
  nutrition: "alta",
  hydration: "alta",
  frizzControl: "alta",
  reconstruction: "alta",
  definition: "alta",
  oilControl: "alta",
  shine: "alta",
  growth: "alta",
},
    });

    const result = calculateMatch(
      user,
      product,
      createOffer(),
    );

    expect(result.score).toBeLessThanOrEqual(100);
  });
});