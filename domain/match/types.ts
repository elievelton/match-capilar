export type HairCondition =
  | "saudavel"
  | "ressecamento"
  | "fragilidade"
  | "frizz"
  | "porosidade"
  | "baixa_retencao_hidratacao"
  | "falta_de_brilho"
  | "sem_sinal_definido";

export type HairGoal =
  | "hidratacao"
  | "controle_frizz"
  | "ressecamento"
  | "reconstrucao"
  | "definicao"
  | "controle_oleosidade"
  | "brilho"
  | "crescimento"
  | "sem_necessidade_definida";

export type ChemicalTreatment =
  | "sem_quimica_recente"
  | "coloracao"
  | "descoloracao"
  | "alisamento"
  | "multiplos_procedimentos"
  | "quimica_nao_informada";

export type HeatExposure =
  | "nao_usa"
  | "raramente"
  | "as_vezes"
  | "frequentemente"
  | "quase_todos_os_dias";

export type CareRoutine =
  | "rotina_simples"
  | "rotina_moderada"
  | "rotina_completa"
  | "rotina_indefinida";

export type WashFrequency =
  | "todos_os_dias"
  | "dia_sim_dia_nao"
  | "duas_a_tres_semana"
  | "uma_vez_semana"
  | "menos_de_uma_vez_semana"
  | "variavel";

export type HairPattern =
  | "liso"
  | "ondulado"
  | "cacheado"
  | "crespo"
  | "multiplos_padroes"
  | "tipo_nao_informado";

export type RecommendationStrategy =
  | "necessidades_especificas"
  | "cuidado_amplo";

export type Budget = {
  maxAmount: number;
};

export type UserProfile = {
  hairPattern: HairPattern;
  hairConditions: HairCondition[];
  goals: HairGoal[];
  chemicalTreatment: ChemicalTreatment;
  heatExposure: HeatExposure;
  careRoutine: CareRoutine;
  washFrequency: WashFrequency;
  budget: Budget;
  recommendationStrategy: RecommendationStrategy;
};