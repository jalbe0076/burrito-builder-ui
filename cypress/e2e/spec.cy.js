describe("Should be able to submit a burrito order", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burritoOrders.json'
    }).as('orders')

    cy.visit("http://localhost:3000/");
  })

  it("Should display a title, form and existing orders. Should only allow to submit an order if a name and at least one ingredient is entered.", () => {
    cy.wait('@orders').then(() => {
      cy.get('h1').contains('Burrito Builder')
        .get('form').should('be.visible').children().should('have.length', 15)
        .get('input').should('have.attr', 'name', 'name')
        .get('form').children().next().first().should('have.attr', 'name', 'beans')
        .get('form').children().next().next().should('have.attr', 'name', 'steak')
        .get('.order-selections').contains('Order: Nothing selected')
        .get('section').children().should('have.length', 3)
    })
  });
});
