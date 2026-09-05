export type ProductCategory =
  | "shampoo"
  | "condicionador"
  | "mascara"
  | "leave_in"
  | "finalizador"
  | "oleo"
  | "tratamento"
  | "outro";

export type MatchLevel =
  | "alta"
  | "media"
  | "baixa"
  | "nao_indicado";

export type HairPattern =
  | "liso"
  | "ondulado"
  | "cacheado"
  | "crespo"
  | "multiplos_padroes";

export type ProductIntensity =
  | "leve"
  | "media"
  | "intensa";

export type RoutineComplexity =
  | "simples"
  | "moderada"
  | "complexa";

export type ProductNeeds = {
  hydration: MatchLevel;
  nutrition: MatchLevel;
  reconstruction: MatchLevel;
  frizzControl: MatchLevel;
  definition: MatchLevel;
  oilControl: MatchLevel;
  shine: MatchLevel;
  growth: MatchLevel;
};

export type ProductCompatibility = {
  hairPatterns: HairPattern[];
};

export type ProductCharacteristics = {
  intensity: ProductIntensity;
  routineComplexity: RoutineComplexity;
};

export type ProductProfile = {
  name: string;
  brand: string;
  category: ProductCategory;
  needs: ProductNeeds;
  compatibility: ProductCompatibility;
  characteristics: ProductCharacteristics;
};