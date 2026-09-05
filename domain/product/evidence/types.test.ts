import { describe, expect, it } from "vitest";
import type { Evidence } from "./types";

describe("Evidence", () => {
  it("deve representar uma evidência de produto", () => {
    const evidence: Evidence = {
      id: "ev_001",
      sourceType: "fabricante",
      source: "Página oficial do produto",
      evidenceType: "declaracao_fabricante",
      statement:
        "Desenvolvido para cabelos cacheados e crespos, proporcionando hidratação e definição.",
      collectedAt: "2026-09-04",
      reliability: "alta",
    };

    expect(evidence.id).toBe("ev_001");
    expect(evidence.sourceType).toBe("fabricante");
    expect(evidence.source).toBe("Página oficial do produto");
    expect(evidence.evidenceType).toBe("declaracao_fabricante");
    expect(evidence.statement).toContain("hidratação");
    expect(evidence.collectedAt).toBe("2026-09-04");
    expect(evidence.reliability).toBe("alta");
  });
});