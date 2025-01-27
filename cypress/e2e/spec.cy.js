describe("Should be able to submit a burrito order", () => {
  beforeEach(() => {
    cy.intercept('GET', 'http://localhost:3001/api/v1/orders', {
      statusCode: 200,
      fixture: 'burritoOrders.json'
    }).as('orders')

    cy.visit("http://localhost:3000/");
  })

  it("Should display a title, a form and existing orders. Should only allow to submit an order if a name and at least one ingredient is entered.", () => {
    cy.wait('@orders').then(() => {
      cy.get('h1').contains('Burrito Builder')
        .get('form').should('be.visible').children().should('have.length', 15)
        .get('input').should('have.attr', 'name', 'name')
        .get('form').children().next().first().should('have.attr', 'name', 'beans')
        .get('form').children().next().next().should('have.attr', 'name', 'steak')
        .get('section').children().should('have.length', 3)
        .get('section').children().first().contains('h3', 'Pat')
        .get('section').children().first().find('ul>li').should('have.length', 5)
        .get('section').children().first().find('ul>li').first().contains('li', 'beans')
        .get('section').children().first().find('ul>li').last().contains('li', 'jalapeno')
        .get('section').children().last().contains('h3', 'Alex')
        .get('section').children().last().find('ul>li').should('have.length', 5)
        .get('section').children().last().find('ul>li').first().contains('li', 'sofritas')
        .get('section').children().last().find('ul>li').last().contains('li', 'queso fresco')
        .get('.order-selections').contains('Order: Nothing selected')
      cy.get(':nth-child(15)').click()
        .get('section').children().should('have.length', 3)
      cy.get('[name="jalapenos"]').click()
        .get('.order-selections').contains('Order: jalapenos')
        .get('[name="carnitas"]').click()
        .get('.order-selections').contains('Order: jalapenos, carnitas')
        .get(':nth-child(15)').click()
        .get('section').children().should('have.length', 3)
      cy.get('input').type('Mirian')
        .intercept('POST', 'http://localhost:3001/api/v1/orders', {
          statusCode: 201,
          body: {
            name: "Mirian",
            ingredients: ["jalapeno", "carnitas"]
          }
        })
        .get(':nth-child(15)').click()
        .get('.order-selections').contains('Order: Nothing selected')
        .get('section').children().should('have.length', 4)
        .get('section').children().last().contains('h3', 'Mirian')
        .get('section').children().last().find('ul>li').should('have.length', 2)
        .get('section').children().last().find('ul>li').first().contains('li', 'jalapeno')
        .get('section').children().last().find('ul>li').last().contains('li', 'carnitas')
      cy.get('input').type('Naze')
        .intercept('POST', 'http://localhost:3001/api/v1/orders', {
          statusCode: 201,
          body: {
            name: "Naze",
            ingredients: ["hot sauce"]
          }
        })
        .get('.order-selections').contains('Order: Nothing selected')
        .get(':nth-child(15)').click()
        .get('section').children().should('have.length', 4)
        .get('[name="hot sauce"]').click()
        .get('.order-selections').contains('Order: hot sauce')
        .get(':nth-child(15)').click()
        .get('.order-selections').contains('Order: Nothing selected')
        .get('section').children().should('have.length', 5)
        .get('section').children().last().contains('h3', 'Naze')
        .get('section').children().last().find('ul>li').should('have.length', 1)
        .get('section').children().last().find('ul>li').first().contains('li', 'hot sauce')
    })
  });

  it('Should be able to delete an existing order', () => {
    cy.intercept('DELETE', 'http://localhost:3001/api/v1/orders/1').as('delete')
    cy.wait('@orders').then(() => {
      cy.get('section').children().should('have.length', 3)
        // .wait('@delete').then(() => {
          cy.get('section').children().first().find('.delete-btn').click()
          .get('section').children().should('have.length', 2)
        // })
    })
  })

});
