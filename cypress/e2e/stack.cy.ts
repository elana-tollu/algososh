describe('stack', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/stack')
    })

    it('disabled when empty', () => {
        cy.get('[data-cy="item-to-add"]').should('be.empty')
        cy.contains('Добавить').should('be.disabled')  
    })

    it('push', () => {
        cy.get('[data-cy="circle"]').should('not.exist')

        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить').click()
        
        cy.get('[data-cy="circle"]').as('items0')
            .should('have.length', 1)
            .should('have.data', 'cyState', 'changing')
        cy.get('@items0')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
        cy.get('@items0')
            .find('[data-cy="head"]')
            .should('have.text', 'top')
        cy.get('@items0')
            .find('[data-cy="index"]')
            .should('have.text', '0')

        cy.get('[data-cy="circle"]')
            .should('have.data', 'cyState', 'default')
    })
})