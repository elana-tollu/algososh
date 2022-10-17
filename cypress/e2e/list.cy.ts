describe('list', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/list')
    })

    it('disabled when empty', () => {
        cy.get('[data-cy="item-to-add"]').should('be.empty')
        cy.get('[data-cy="index-to-add"]').should('be.empty')
        cy.contains('Добавить в head').should('be.disabled')  
        cy.contains('Добавить в tail').should('be.disabled')  
        cy.contains('Добавить по индексу').should('be.disabled')  
        cy.contains('Удалить по индексу').should('be.disabled')  
    })

    it('default list', () => {
        cy.get('[data-cy="circle"]').as('items').should('not.be.empty')
            .each(circle => {
                cy.wrap(circle)
                    .should('have.data', 'cyState', 'default')
            }) 
            
        cy.get('@items').first().as('items1')
            .should('have.data', 'cyState', 'default')
        cy.get('@items1')
            .find('[data-cy="head"]')
            .should('have.text', 'head')
        cy.get('@items1')
            .find('[data-cy="tail"]')
            .should('be.empty')

        cy.get('@items').last().as('itemsZ')
            .should('have.data', 'cyState', 'default')
        cy.get('@itemsZ')
            .find('[data-cy="head"]')
            .should('be.empty')
        cy.get('@itemsZ')
            .find('[data-cy="tail"]')
            .should('have.text', 'tail')
    })

})