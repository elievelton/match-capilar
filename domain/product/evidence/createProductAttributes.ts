import type { ProductAttribute } from "./attributes";
import type { ProductInterpretation } from "./interpretation";

export function createProductAttributes(
  interpretations: ProductInterpretation[],
): ProductAttribute[] {
  return interpretations.map((interpretation, index) => ({
    id: `attr_${index + 1}`,
    attribute: interpretation.attribute,
    value: interpretation.value,
    evidenceIds: [interpretation.evidenceId],
    confidence: interpretation.confidence,
  }));
}