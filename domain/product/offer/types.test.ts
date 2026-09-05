import { describe, expect, it } from "vitest";
import type { ProductOffer } from "./types";

describe("ProductOffer", () => {
  it("deve representar uma oferta comercial de um produto", () => {
    const offer: ProductOffer = {
      productId: "product_001",
      store: "Loja exemplo",
      price: 49.9,
      size: "250g",
      url: "https://exemplo.com/produto",
      available: true,
    };

    expect(offer.productId).toBe("product_001");
    expect(offer.store).toBe("Loja exemplo");
    expect(offer.price).toBe(49.9);
    expect(offer.size).toBe("250g");
    expect(offer.url).toContain("exemplo.com");
    expect(offer.available).toBe(true);
  });
});