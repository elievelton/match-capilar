import type { ProductInterpretation } from "./interpretation";
import type { Evidence } from "./types";

/**
 * Evidências coletadas em 05/09/2026.
 *
 * As frases abaixo são resumos/paráfrases curtas das páginas das marcas.
 * O objetivo é manter rastreabilidade entre fonte -> interpretação -> DNA.
 */
export const realProductEvidence: Evidence[] = [
  {
    id: "ev-lola-morte-subita-01",
    sourceType: "fabricante",
    source: "Lola Cosmetics — página oficial Morte Súbita 450g",
    evidenceType: "declaracao_fabricante",
    statement:
      "A marca descreve hidratação profunda, recuperação de fios danificados, brilho, maciez, controle de frizz, redução do aspecto ressecado e fortalecimento.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },
  {
    id: "ev-lola-morte-subita-02",
    sourceType: "fabricante",
    source: "Lola Cosmetics — página oficial Morte Súbita 450g",
    evidenceType: "declaracao_fabricante",
    statement:
      "A página informa aloe vera para hidratação e fortalecimento, óleo de coco para nutrição e redução de frizz e blend de aminoácidos para reparação e fortalecimento.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },

  {
    id: "ev-wella-fusion-01",
    sourceType: "fabricante",
    source: "Wella Professionals — página oficial Fusion Mask",
    evidenceType: "declaracao_fabricante",
    statement:
      "A marca descreve reparação intensa para cabelos fragilizados e ação contra quebra causada por química, coloração, calor e outros danos.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },
  {
    id: "ev-wella-fusion-02",
    sourceType: "fabricante",
    source: "Wella Professionals — página oficial Fusion Mask",
    evidenceType: "declaracao_fabricante",
    statement:
      "A tecnologia Fusion Silksteel combina aminoácidos da seda e lipídios micronizados para recuperação da fibra; a marca também destaca maciez, brilho e resistência.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },

  {
    id: "ev-kerastase-masquintense-01",
    sourceType: "fabricante",
    source: "Kérastase — página oficial Nutritive Masquintense",
    evidenceType: "declaracao_fabricante",
    statement:
      "A marca descreve a Masquintense como máscara de nutrição profunda para cabelos ressecados ou secos, finos a médios.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },
  {
    id: "ev-kerastase-masquintense-02",
    sourceType: "fabricante",
    source: "Kérastase — página oficial Nutritive Masquintense",
    evidenceType: "declaracao_fabricante",
    statement:
      "A página destaca nutrientes, hidratação profunda, maciez, recuperação, proteção contra ressecamento e aumento de brilho.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },

  {
    id: "ev-loreal-arm-01",
    sourceType: "fabricante",
    source: "L'Oréal Professionnel — página oficial Absolut Repair Molecular",
    evidenceType: "declaracao_fabricante",
    statement:
      "A marca classifica o produto como máscara reconstrutora, hidratante e fortalecedora para cabelos danificados e quebradiços.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },
  {
    id: "ev-loreal-arm-02",
    sourceType: "fabricante",
    source: "L'Oréal Professionnel — página oficial Absolut Repair Molecular",
    evidenceType: "declaracao_fabricante",
    statement:
      "A fórmula usa peptídeos e aminoácidos; a marca destaca reconstrução, hidratação intensa, força, elasticidade, maciez e movimento.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },

  {
    id: "ev-novex-santo-black-01",
    sourceType: "fabricante",
    source: "Embelleze — página oficial Santo Black Poderoso",
    evidenceType: "declaracao_fabricante",
    statement:
      "A marca indica o produto para cabelos cacheados, secos, oleosos, mistos, com química, pintados, sem brilho, com pontas duplas e frizz.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },
  {
    id: "ev-novex-santo-black-02",
    sourceType: "fabricante",
    source: "Embelleze — página oficial Santo Black Poderoso",
    evidenceType: "declaracao_fabricante",
    statement:
      "A marca destaca hidratação, nutrição, definição, brilho, maciez, redução de frizz e combate ao ressecamento; também cita óleo de semente de baobá.",
    collectedAt: "2026-09-05",
    reliability: "alta",
  },
];

export const realProductInterpretations: Record<
  string,
  ProductInterpretation[]
> = {
  "lola-morte-subita-450g": [
    {
      attribute: "hidratacao",
      value: "alta",
      evidenceId: "ev-lola-morte-subita-01",
      confidence: "alta",
    },
    {
      attribute: "nutricao",
      value: "media",
      evidenceId: "ev-lola-morte-subita-02",
      confidence: "alta",
    },
    {
      attribute: "reconstrucao",
      value: "media",
      evidenceId: "ev-lola-morte-subita-02",
      confidence: "media",
    },
    {
      attribute: "controle_frizz",
      value: "alta",
      evidenceId: "ev-lola-morte-subita-01",
      confidence: "alta",
    },
    {
      attribute: "brilho",
      value: "alta",
      evidenceId: "ev-lola-morte-subita-01",
      confidence: "alta",
    },
  ],

  "wella-fusion-150ml": [
    {
      attribute: "reconstrucao",
      value: "alta",
      evidenceId: "ev-wella-fusion-01",
      confidence: "alta",
    },
    {
      attribute: "controle_frizz",
      value: "media",
      evidenceId: "ev-wella-fusion-02",
      confidence: "alta",
    },
    {
      attribute: "brilho",
      value: "alta",
      evidenceId: "ev-wella-fusion-02",
      confidence: "alta",
    },
  ],

  "kerastase-masquintense-200ml": [
    {
      attribute: "nutricao",
      value: "alta",
      evidenceId: "ev-kerastase-masquintense-01",
      confidence: "alta",
    },
    {
      attribute: "hidratacao",
      value: "alta",
      evidenceId: "ev-kerastase-masquintense-02",
      confidence: "alta",
    },
    {
      attribute: "brilho",
      value: "alta",
      evidenceId: "ev-kerastase-masquintense-02",
      confidence: "alta",
    },
  ],

  "loreal-absolut-repair-molecular-250ml": [
    {
      attribute: "reconstrucao",
      value: "alta",
      evidenceId: "ev-loreal-arm-01",
      confidence: "alta",
    },
    {
      attribute: "hidratacao",
      value: "alta",
      evidenceId: "ev-loreal-arm-02",
      confidence: "alta",
    },
  ],

  "novex-santo-black-poderoso-1kg": [
    {
      attribute: "hidratacao",
      value: "alta",
      evidenceId: "ev-novex-santo-black-02",
      confidence: "alta",
    },
    {
      attribute: "nutricao",
      value: "alta",
      evidenceId: "ev-novex-santo-black-02",
      confidence: "alta",
    },
    {
      attribute: "controle_frizz",
      value: "alta",
      evidenceId: "ev-novex-santo-black-02",
      confidence: "alta",
    },
    {
      attribute: "definicao",
      value: "alta",
      evidenceId: "ev-novex-santo-black-02",
      confidence: "alta",
    },
    {
      attribute: "brilho",
      value: "alta",
      evidenceId: "ev-novex-santo-black-02",
      confidence: "alta",
    },
  ],
};
