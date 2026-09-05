import { describe, expect, it } from "vitest";
import type { ProductAttribute } from "./attributes";

describe("ProductAttribute", () => {
  it("deve representar uma característica interpretada a partir de evidências", () => {
    const attribute: ProductAttribute = {
      id: "attr_001",
      attribute: "compatibilidade_tipo_cabelo",
      value: "cacheado",
      evidenceIds: ["ev_001"],
      confidence: "alta",
    };

    expect(attribute.id).toBe("attr_001");
    expect(attribute.attribute).toBe("compatibilidade_tipo_cabelo");
    expect(attribute.value).toBe("cacheado");
    expect(attribute.evidenceIds).toContain("ev_001");
    expect(attribute.confidence).toBe("alta");
  });
});