describe("Wishlist Functionality", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should add an item to the wishlist", () => {
    cy.get("[data-testid='add-to-wishlist']")
      .first()
      .should("exist")
      .and("be.visible");
    cy.wait(300);

    cy.get("[data-testid='add-to-wishlist']").first().click();

    cy.get("[data-testid='wishlist-counter']")
      .should("exist")
      .should("be.visible")
      .should("contain", "1");
  });

  it("should remove an item from the wishlist", () => {
    cy.get("[data-testid='add-to-wishlist']").first().click();

    cy.get("[data-testid='wishlist-counter']")
      .should("exist")
      .should("contain", "1");

    cy.get("[data-testid='remove-from-wishlist']")
      .first()
      .should("exist")
      .and("be.visible")
      .click();

    cy.get("[data-testid='wishlist-counter']").should("not.exist");
  });

  it("should persist wishlist after reload", () => {
    cy.get("[data-testid='add-to-wishlist']").first().click();

    cy.get("[data-testid='wishlist-counter']")
      .should("exist")
      .should("contain", "1");

    cy.reload();

    cy.get("[data-testid='wishlist-counter']")
      .should("exist")
      .should("be.visible")
      .should("contain", "1");
  });
});
