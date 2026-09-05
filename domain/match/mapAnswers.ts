import type {
  Budget,
  CareRoutine,
  ChemicalTreatment,
  HairCondition,
  HairGoal,
  HairPattern,
  HeatExposure,
  WashFrequency,
} from "./types";

export function mapHairCondition(answer: string): HairCondition {
  switch (answer) {
    case "Macios e saudáveis":
      return "saudavel";

    case "Ressecados e ásperos":
      return "ressecamento";

    case "Frágeis ou quebradiços":
      return "fragilidade";

    case "Com frizz e desalinhados":
      return "frizz";

    case "Porosos e com dificuldade de segurar hidratação":
      return "porosidade";

    case "Com aparência opaca, sem brilho":
      return "falta_de_brilho";

    default:
      return "sem_sinal_definido";
  }
}

export function mapHairGoal(answer: string): HairGoal {
  switch (answer) {
    case "Hidratação":
      return "hidratacao";

    case "Frizz":
      return "controle_frizz";

    case "Ressecamento":
      return "ressecamento";

    case "Reconstrução":
      return "reconstrucao";

    case "Definição":
      return "definicao";

    case "Oleosidade":
      return "controle_oleosidade";

    case "Brilho":
      return "brilho";

    case "Crescimento":
      return "crescimento";

    default:
      return "sem_necessidade_definida";
  }
}

export function mapChemicalTreatment(
  answer: string,
): ChemicalTreatment {
  switch (answer) {
    case "Não":
      return "sem_quimica_recente";

    case "Coloração / tonalizante":
      return "coloracao";

    case "Descoloração / mechas":
      return "descoloracao";

    case "Alisamento / relaxamento":
      return "alisamento";

    case "Mais de um procedimento":
      return "multiplos_procedimentos";

    default:
      return "quimica_nao_informada";
  }
}

export function mapHeatExposure(answer: string): HeatExposure {
  switch (answer) {
    case "Não uso":
      return "nao_usa";

    case "Raramente":
      return "raramente";

    case "Às vezes":
      return "as_vezes";

    case "Frequentemente":
      return "frequentemente";

    case "Quase todos os dias":
      return "quase_todos_os_dias";

    default:
      return "nao_usa";
  }
}

export function mapCareRoutine(answer: string): CareRoutine {
  switch (answer) {
    case "Prática — prefiro poucos produtos e uma rotina simples":
      return "rotina_simples";

    case "Moderada — uso alguns produtos e tenho uma rotina regular":
      return "rotina_moderada";

    case "Completa — gosto de cuidar bastante e usar diferentes produtos":
      return "rotina_completa";

    case "Não tenho uma rotina definida":
      return "rotina_indefinida";

    default:
      return "rotina_indefinida";
  }
}

export function mapWashFrequency(
  answer: string,
): WashFrequency {
  switch (answer) {
    case "Todos os dias":
      return "todos_os_dias";

    case "Dia sim, dia não":
      return "dia_sim_dia_nao";

    case "2 a 3 vezes por semana":
      return "duas_a_tres_semana";

    case "1 vez por semana":
      return "uma_vez_semana";

    case "Menos de 1 vez por semana":
      return "menos_de_uma_vez_semana";

    case "Varia bastante":
      return "variavel";

    default:
      return "variavel";
  }
}

export function mapHairPattern(answer: string): HairPattern {
  switch (answer) {
    case "Liso":
      return "liso";

    case "Ondulado":
      return "ondulado";

    case "Cacheado":
      return "cacheado";

    case "Crespo":
      return "crespo";

    case "Mais de um padrão":
      return "multiplos_padroes";

    default:
      return "tipo_nao_informado";
  }
}

export function mapBudget(answer: string): Budget {
  switch (answer) {
    case "Até R$ 30":
      return { maxAmount: 30 };

    case "R$ 31 a R$ 50":
      return { maxAmount: 50 };

    case "R$ 51 a R$ 80":
      return { maxAmount: 80 };

    case "R$ 81 a R$ 120":
      return { maxAmount: 120 };

    case "R$ 121 a R$ 200":
      return { maxAmount: 200 };

    case "Mais de R$ 200":
      return { maxAmount: Number.POSITIVE_INFINITY };

    case "Não quero informar":
      return { maxAmount: Number.POSITIVE_INFINITY };

    default:
      return { maxAmount: Number.POSITIVE_INFINITY };
  }
}