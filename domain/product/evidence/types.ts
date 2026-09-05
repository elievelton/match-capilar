export type EvidenceSourceType =
  | "fabricante"
  | "documentacao_tecnica"
  | "fonte_terceiros";

export type EvidenceType =
  | "declaracao_fabricante"
  | "composicao"
  | "documentacao_tecnica"
  | "fonte_terceiros";

export type EvidenceReliability =
  | "alta"
  | "media"
  | "baixa";

export type Evidence = {
  id: string;
  sourceType: EvidenceSourceType;
  source: string;
  evidenceType: EvidenceType;
  statement: string;
  collectedAt: string;
  reliability: EvidenceReliability;
};