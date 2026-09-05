export type ProductAttributeType =
  | "compatibilidade_tipo_cabelo"
  | "hidratacao"
  | "nutricao"
  | "reconstrucao"
  | "controle_frizz"
  | "definicao"
  | "controle_oleosidade"
  | "brilho"
  | "crescimento";

export type ProductAttributeValue =
  | "liso"
  | "ondulado"
  | "cacheado"
  | "crespo"
  | "alta"
  | "media"
  | "baixa"
  | "nao_indicado";

export type AttributeConfidence =
  | "alta"
  | "media"
  | "baixa";

export type ProductAttribute = {
  id: string;
  attribute: ProductAttributeType;
  value: ProductAttributeValue;
  evidenceIds: string[];
  confidence: AttributeConfidence;
};