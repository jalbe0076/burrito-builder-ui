describe("Should be able to submit a burrito order", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burritoOrders.json'
    }).as('orders')

    cy.visit("http://localhost:3000/");
  })

  it("Should display existing orders, and only allow to submit an order to be put in if a name and at least one ingredient is entered.", () => {
    cy.wait('@orders').then(() => {
      cy.get('h1').contains('Burrito Builder')
    })
  });
});
