import { describe, expect, it } from "vitest";
import { createProductAttributes } from "./createProductAttributes";
import type { ProductInterpretation } from "./interpretation";

describe("createProductAttributes", () => {
  it("deve transformar interpretações em atributos de produto", () => {
    const interpretations: ProductInterpretation[] = [
      {
        attribute: "compatibilidade_tipo_cabelo",
        value: "cacheado",
        evidenceId: "ev_001",
        confidence: "alta",
      },
      {
        attribute: "definicao",
        value: "alta",
        evidenceId: "ev_001",
        confidence: "media",
      },
    ];

    const attributes = createProductAttributes(interpretations);

    expect(attributes).toHaveLength(2);

    expect(attributes[0]).toEqual({
      id: "attr_1",
      attribute: "compatibilidade_tipo_cabelo",
      value: "cacheado",
      evidenceIds: ["ev_001"],
      confidence: "alta",
    });

    expect(attributes[1]).toEqual({
      id: "attr_2",
      attribute: "definicao",
      value: "alta",
      evidenceIds: ["ev_001"],
      confidence: "media",
    });
  });

  it("deve retornar uma lista vazia quando não houver interpretações", () => {
    expect(createProductAttributes([])).toEqual([]);
  });
});