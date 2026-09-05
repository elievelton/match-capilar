import { describe, expect, it } from "vitest";
import type { ProductInterpretation } from "./interpretation";

describe("ProductInterpretation", () => {
  it("deve representar uma interpretação sustentada por uma evidência", () => {
    const interpretation: ProductInterpretation = {
      attribute: "compatibilidade_tipo_cabelo",
      value: "cacheado",
      evidenceId: "ev_001",
      confidence: "alta",
    };

    expect(interpretation.attribute).toBe(
      "compatibilidade_tipo_cabelo",
    );
    expect(interpretation.value).toBe("cacheado");
    expect(interpretation.evidenceId).toBe("ev_001");
    expect(interpretation.confidence).toBe("alta");
  });
});