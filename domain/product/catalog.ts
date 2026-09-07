import type { ProductOffer } from "./offer/types";
import type { ProductProfile } from "./types";

export type CatalogProduct = {
  product: ProductProfile;
  offer: ProductOffer;
};

export const productCatalog: CatalogProduct[] = [
  {
    product: {
      id: "lola-morte-subita-450g",
      name: "Morte Súbita - Máscara 450g",
      brand: "Lola Cosmetics",
      category: "mascara",

      // Dados fictícios para simulação do Match Engine.
      rating: 4.9,
      reviewCount: 2500,

      imageUrl:
        "https://images.tcdn.com.br/img/img_prod/926373/mascara_super_hidrante_morte_subita_lola_cosmetics_450g_7349_1_e0b7a663590f723b467f304daf4251ad.jpeg",

      sourceUrl:
        "https://lolacosmetics.com.br/produtos/morte-subita",

      needs: {
        hydration: "alta",
        nutrition: "media",
        reconstruction: "baixa",
        frizzControl: "alta",
        definition: "media",
        oilControl: "nao_indicado",
        shine: "alta",
        growth: "nao_indicado",
      },

      compatibility: {
        hairPatterns: [
          "liso",
          "ondulado",
          "cacheado",
          "crespo",
        ],
      },

      characteristics: {
  intensity: "media",
  routineComplexity: "simples",
  fragrance: "agradavel",
},
    },

    offer: {
      productId: "lola-morte-subita-450g",
      store: "Loja oficial",
      price: 45.9,
      size: "450g",
      url: "https://lolacosmetics.com.br/produtos/morte-subita",
      available: true,
    },
  },

  {
    product: {
      id: "wella-fusion-150ml",
      name: "Fusion - Máscara 150ml",
      brand: "Wella",
      category: "mascara",

      // Dados fictícios para simulação do Match Engine.
      rating: 4.8,
      reviewCount: 1800,

      imageUrl:
        "https://cdn.awsli.com.br/2500x2500/2752/2752602/produto/284610756/650929-4-nwxf1rqrhs.jpg",

      sourceUrl:
        "https://www.wella.com/professional/br-BR",

      needs: {
        hydration: "media",
        nutrition: "media",
        reconstruction: "alta",
        frizzControl: "media",
        definition: "baixa",
        oilControl: "nao_indicado",
        shine: "alta",
        growth: "nao_indicado",
      },

      compatibility: {
        hairPatterns: [
          "liso",
          "ondulado",
          "cacheado",
          "crespo",
        ],
      },

      characteristics: {
  intensity: "media",
  routineComplexity: "simples",
  fragrance: "agradavel",
},
    },

    offer: {
      productId: "wella-fusion-150ml",
      store: "Loja oficial",
      price: 89.9,
      size: "150ml",
      url: "https://www.wella.com/professional/br-BR",
      available: true,
    },
  },

  {
    product: {
      id: "kerastase-masquintense-200ml",
      name: "Masquintense - Máscara 200ml",
      brand: "Kérastase",
      category: "mascara",

      // Dados fictícios para simulação do Match Engine.
      rating: 4.9,
      reviewCount: 700,

      imageUrl:
        "https://http2.mlstatic.com/D_NQ_NP_794160-MLB100686298602_122025-O-kerastase--nutritive--masquintense-riche-200-g.webp",

      sourceUrl:
        "https://www.kerastase.com.br",

      needs: {
        hydration: "alta",
        nutrition: "alta",
        reconstruction: "media",
        frizzControl: "alta",
        definition: "media",
        oilControl: "nao_indicado",
        shine: "alta",
        growth: "nao_indicado",
      },

      compatibility: {
        hairPatterns: [
          "liso",
          "ondulado",
          "cacheado",
          "crespo",
        ],
      },

      characteristics: {
        intensity: "intensa",
        routineComplexity: "moderada",
        fragrance: "agradavel",
      },
    },

    offer: {
      productId: "kerastase-masquintense-200ml",
      store: "Loja oficial",
      price: 199.9,
      size: "200ml",
      url: "https://www.kerastase.com.br",
      available: true,
    },
  },

  {
    product: {
      id: "loreal-absolut-repair-molecular-250ml",
      name: "Absolut Repair Molecular - Máscara 250ml",
      brand: "L'Oréal Professionnel",
      category: "mascara",

      // Dados fictícios para simulação do Match Engine.
      rating: 4.7,
      reviewCount: 3000,

      imageUrl:
        "https://d3kqa2vk8m4sbm.cloudfront.net/Custom/Content/Products/52/26/52269_loreal-absolut-repair-molecular-mascara-250ml-pr-8560-e4173000-loreal_l1_638784261991594117.webp",

      sourceUrl:
        "https://www.lorealprofessionnel.com.br",

      needs: {
        hydration: "alta",
        nutrition: "baixa",
        reconstruction: "alta",
        frizzControl: "alta",
        definition: "baixa",
        oilControl: "nao_indicado",
        shine: "alta",
        growth: "nao_indicado",
      },

      compatibility: {
        hairPatterns: [
          "liso",
          "ondulado",
          "cacheado",
          "crespo",
        ],
      },

      characteristics: {
        intensity: "intensa",
        routineComplexity: "complexa",
        fragrance: "agradavel",
      },
    },

    offer: {
      productId: "loreal-absolut-repair-molecular-250ml",
      store: "Loja oficial",
      price: 179.9,
      size: "250ml",
      url: "https://www.lorealprofessionnel.com.br",
      available: true,
    },
  },

  {
    product: {
      id: "novex-santo-black-1kg",
      name: "Meus Cachos Santo Black Poderoso - Creme de Tratamento 1kg",
      brand: "Novex",
      category: "mascara",

      // Dados fictícios para simulação do Match Engine.
      rating: 4.8,
      reviewCount: 5000,

      imageUrl:
        "https://www.embelleze.com/cdn/shop/files/santo-black-poderoso.jpg",

      sourceUrl:
        "https://www.embelleze.com",

      needs: {
        hydration: "alta",
        nutrition: "alta",
        reconstruction: "baixa",
        frizzControl: "alta",
        definition: "alta",
        oilControl: "nao_indicado",
        shine: "alta",
        growth: "nao_indicado",
      },

      compatibility: {
        hairPatterns: [
          "cacheado",
          "crespo",
        ],
      },

      characteristics: {
        intensity: "media",
        routineComplexity: "simples",
        fragrance: "neutro",
      },
    },

    offer: {
      productId: "novex-santo-black-1kg",
      store: "Loja oficial",
      price: 29.9,
      size: "1kg",
      url: "https://www.embelleze.com",
      available: true,
    },
  },
];