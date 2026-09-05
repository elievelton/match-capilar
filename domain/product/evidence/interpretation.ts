import type {
  AttributeConfidence,
  ProductAttributeType,
  ProductAttributeValue,
} from "./attributes";

export type ProductInterpretation = {
  attribute: ProductAttributeType;
  value: ProductAttributeValue;
  evidenceId: string;
  confidence: AttributeConfidence;
};