import { describe, expect, it } from "vitest";
import type { ProductProfile } from "./types";

describe("ProductProfile", () => {
  it("deve representar um produto completo", () => {
    const product: ProductProfile = {
      name: "Produto de exemplo",
      brand: "Marca de exemplo",
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
  fragrance: "agradavel",
},
    };

    expect(product.name).toBe("Produto de exemplo");
    expect(product.brand).toBe("Marca de exemplo");
    expect(product.category).toBe("mascara");

    expect(product.needs.hydration).toBe("alta");
    expect(product.needs.frizzControl).toBe("alta");

    expect(product.compatibility.hairPatterns).toContain("cacheado");

    expect(product.characteristics.intensity).toBe("media");
    expect(product.characteristics.routineComplexity).toBe("simples");
  });
});
