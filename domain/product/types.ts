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

export type ProductIntensity = "leve" | "media" | "intensa";
export type RoutineComplexity = "simples" | "moderada" | "complexa";
export type ProductFragrance = "agradavel" | "neutro";

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
  fragrance: ProductFragrance;
};

export type ProductProfile = {
  /**
   * Metadados opcionais para enriquecer
   * o catálogo real sem quebrar os testes
   * unitários existentes do domínio.
   */
  id?: string;
  name: string;
  brand: string;
  category: ProductCategory;
  imageUrl?: string;
  sourceUrl?: string;

  /**
   * Dados de reputação externa do produto.
   */
  rating?: number;
  reviewCount?: number;

  needs: ProductNeeds;
  compatibility: ProductCompatibility;
  characteristics: ProductCharacteristics;
};