import type { UserProfile } from "./types";
import {
  mapBudget,
  mapCareRoutine,
  mapChemicalTreatment,
  mapHairCondition,
  mapHairGoal,
  mapHairPattern,
  mapHeatExposure,
  mapScentMatters,
  mapWashFrequency,
} from "./mapAnswers";

export type QuizAnswers = Record<number, string[]>;

export function createUserProfile(
  answers: QuizAnswers,
): UserProfile {
  const hairConditionAnswer = answers[1]?.[0] ?? "";
  const hairGoalAnswers = answers[2] ?? [];
  const chemicalTreatmentAnswer = answers[3]?.[0] ?? "";
  const heatExposureAnswer = answers[4]?.[0] ?? "";
  const careRoutineAnswer = answers[5]?.[0] ?? "";
  const washFrequencyAnswer = answers[6]?.[0] ?? "";
  const hairPatternAnswer = answers[7]?.[0] ?? "";
  const budgetAnswer = answers[8]?.[0] ?? "";
  const scentMattersAnswer = answers[9]?.[0] ?? "";

  const hairConditions = [
    mapHairCondition(hairConditionAnswer),
  ];

  const goals = hairGoalAnswers.map(mapHairGoal);

  const hasSpecificNeeds =
    !hairConditions.includes("sem_sinal_definido") ||
    !goals.includes("sem_necessidade_definida");

  return {
    hairPattern: mapHairPattern(hairPatternAnswer),
    hairConditions,
    goals,
    chemicalTreatment: mapChemicalTreatment(
      chemicalTreatmentAnswer,
    ),
    heatExposure: mapHeatExposure(heatExposureAnswer),
    careRoutine: mapCareRoutine(careRoutineAnswer),
    washFrequency: mapWashFrequency(washFrequencyAnswer),
    budget: mapBudget(budgetAnswer),
    scentMatters: mapScentMatters(scentMattersAnswer),
    recommendationStrategy: hasSpecificNeeds
      ? "necessidades_especificas"
      : "cuidado_amplo",
  };
}