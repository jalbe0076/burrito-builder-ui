describe("Should be able to submit a burrito order", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      
    })
  })
  it("passes", () => {
    cy.visit("https://example.cypress.io");
  });
});
