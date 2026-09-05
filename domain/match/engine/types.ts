import type { ProductOffer } from "../../product/offer/types";
import type { ProductProfile } from "../../product/types";

export type MatchReason = {
  criterion: string;
  description: string;
};

export type MatchResult = {
  product: ProductProfile;
  offer: ProductOffer;
  score: number;
  level: "alta" | "media" | "baixa" | "nao_indicado";
  reasons: MatchReason[];
};