import { describe, expect, it } from "vitest";
import {
  mapBudget,
  mapCareRoutine,
  mapChemicalTreatment,
  mapHairCondition,
  mapHairGoal,
  mapHairPattern,
  mapHeatExposure,
  mapWashFrequency,
} from "./mapAnswers";
import {
  createUserProfile,
  type QuizAnswers,
} from "./createUserProfile";

describe("mapHairCondition", () => {
  it("deve mapear cabelo ressecado para ressecamento", () => {
    expect(mapHairCondition("Ressecados e ásperos")).toBe(
      "ressecamento",
    );
  });

  it("deve mapear cabelo frágil para fragilidade", () => {
    expect(mapHairCondition("Frágeis ou quebradiços")).toBe(
      "fragilidade",
    );
  });

  it("deve tratar resposta desconhecida como sem sinal definido", () => {
    expect(mapHairCondition("Resposta inexistente")).toBe(
      "sem_sinal_definido",
    );
  });
});

describe("mapHairGoal", () => {
  it("deve mapear hidratação corretamente", () => {
    expect(mapHairGoal("Hidratação")).toBe("hidratacao");
  });

  it("deve mapear brilho corretamente", () => {
    expect(mapHairGoal("Brilho")).toBe("brilho");
  });

  it("deve tratar resposta desconhecida como sem necessidade definida", () => {
    expect(mapHairGoal("Resposta inexistente")).toBe(
      "sem_necessidade_definida",
    );
  });
});

describe("mapChemicalTreatment", () => {
  it("deve mapear ausência de química corretamente", () => {
    expect(mapChemicalTreatment("Não")).toBe(
      "sem_quimica_recente",
    );
  });

  it("deve mapear descoloração corretamente", () => {
    expect(
      mapChemicalTreatment("Descoloração / mechas"),
    ).toBe("descoloracao");
  });

  it("deve preservar química não informada", () => {
    expect(
      mapChemicalTreatment("Não sei / prefiro não informar"),
    ).toBe("quimica_nao_informada");
  });
});

describe("mapHeatExposure", () => {
  it("deve mapear uso frequente de calor", () => {
    expect(mapHeatExposure("Frequentemente")).toBe(
      "frequentemente",
    );
  });

  it("deve mapear uso quase diário de calor", () => {
    expect(mapHeatExposure("Quase todos os dias")).toBe(
      "quase_todos_os_dias",
    );
  });
});

describe("mapCareRoutine", () => {
  it("deve mapear rotina simples", () => {
    expect(
      mapCareRoutine(
        "Prática — prefiro poucos produtos e uma rotina simples",
      ),
    ).toBe("rotina_simples");
  });

  it("deve mapear rotina completa", () => {
    expect(
      mapCareRoutine(
        "Completa — gosto de cuidar bastante e usar diferentes produtos",
      ),
    ).toBe("rotina_completa");
  });
});

describe("mapWashFrequency", () => {
  it("deve mapear lavagem diária", () => {
    expect(mapWashFrequency("Todos os dias")).toBe(
      "todos_os_dias",
    );
  });

  it("deve mapear lavagem de 2 a 3 vezes por semana", () => {
    expect(mapWashFrequency("2 a 3 vezes por semana")).toBe(
      "duas_a_tres_semana",
    );
  });
});

describe("mapHairPattern", () => {
  it("deve mapear cabelo liso", () => {
    expect(mapHairPattern("Liso")).toBe("liso");
  });

  it("deve mapear cabelo cacheado", () => {
    expect(mapHairPattern("Cacheado")).toBe("cacheado");
  });

  it("deve mapear cabelo crespo", () => {
    expect(mapHairPattern("Crespo")).toBe("crespo");
  });

  it("deve tratar tipo de cabelo não informado", () => {
    expect(mapHairPattern("Não sei dizer")).toBe(
      "tipo_nao_informado",
    );
  });
});

describe("mapBudget", () => {
  it("deve mapear orçamento de até 30 reais", () => {
    expect(mapBudget("Até R$ 30")).toEqual({
      maxAmount: 30,
    });
  });

  it("deve mapear orçamento de até 80 reais", () => {
    expect(mapBudget("R$ 51 a R$ 80")).toEqual({
      maxAmount: 80,
    });
  });

  it("deve considerar orçamento sem limite quando o usuário não informar", () => {
    expect(mapBudget("Não quero informar")).toEqual({
      maxAmount: Number.POSITIVE_INFINITY,
    });
  });
});

describe("createUserProfile", () => {
  it("deve criar um perfil completo com necessidades específicas", () => {
    const answers: QuizAnswers = {
      1: ["Ressecados e ásperos"],
      2: ["Hidratação", "Brilho"],
      3: ["Descoloração / mechas"],
      4: ["Frequentemente"],
      5: [
        "Moderada — uso alguns produtos e tenho uma rotina regular",
      ],
      6: ["2 a 3 vezes por semana"],
      7: ["Cacheado"],
      8: ["R$ 51 a R$ 80"],
    };

    expect(createUserProfile(answers)).toEqual({
      hairPattern: "cacheado",
      hairConditions: ["ressecamento"],
      goals: ["hidratacao", "brilho"],
      chemicalTreatment: "descoloracao",
      heatExposure: "frequentemente",
      careRoutine: "rotina_moderada",
      washFrequency: "duas_a_tres_semana",
      budget: {
        maxAmount: 80,
      },
      recommendationStrategy: "necessidades_especificas",
    });
  });

  it("deve usar cuidado amplo quando não houver necessidade definida", () => {
    const answers: QuizAnswers = {
      1: ["Não sei dizer"],
      2: ["Outro / não sei"],
      3: ["Não"],
      4: ["Não uso"],
      5: ["Não tenho uma rotina definida"],
      6: ["Varia bastante"],
      7: ["Cacheado"],
      8: ["Não quero informar"],
    };

    expect(createUserProfile(answers)).toEqual({
      hairPattern: "cacheado",
      hairConditions: ["sem_sinal_definido"],
      goals: ["sem_necessidade_definida"],
      chemicalTreatment: "sem_quimica_recente",
      heatExposure: "nao_usa",
      careRoutine: "rotina_indefinida",
      washFrequency: "variavel",
      budget: {
        maxAmount: Number.POSITIVE_INFINITY,
      },
      recommendationStrategy: "cuidado_amplo",
    });
  });

  it("deve preservar as duas necessidades escolhidas pelo usuário", () => {
    const answers: QuizAnswers = {
      1: ["Com frizz e desalinhados"],
      2: ["Frizz", "Definição"],
      7: ["Ondulado"],
      8: ["Até R$ 30"],
    };

    const profile = createUserProfile(answers);

    expect(profile.hairConditions).toEqual(["frizz"]);

    expect(profile.goals).toEqual([
      "controle_frizz",
      "definicao",
    ]);

    expect(profile.hairPattern).toBe("ondulado");

    expect(profile.budget.maxAmount).toBe(30);

    expect(profile.recommendationStrategy).toBe(
      "necessidades_especificas",
    );
  });
});