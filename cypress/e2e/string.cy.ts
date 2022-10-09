describe('string', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/recursion')
    })

    it('disabled when empty', () => {
        cy.get('[data-cy="string-to-reverse"]').should('be.empty')
        cy.contains('Развернуть').should('be.disabled')  
    })

    it('reversed correctly', () => {
        cy.get('[data-cy="string-to-reverse"]').type('ABC')
        cy.contains('Развернуть').click()
        
        cy.get('[data-step="0"]')
        cy.get('[data-cy="circle"]').as('items0')
        cy.get('@items0').should('have.length', 3)
        cy.get('@items0').eq(0).should('have.text', 'A').should('have.data', 'cyState', 'changing')
        cy.get('@items0').eq(1).should('have.text', 'B').should('have.data', 'cyState', 'default')
        cy.get('@items0').eq(2).should('have.text', 'C').should('have.data', 'cyState', 'changing')

        cy.get('[data-step="1"]')
        cy.get('[data-cy="circle"]').as('items1')
        cy.get('@items1').should('have.length', 3)
        cy.get('@items1').eq(0).should('have.text', 'C').should('have.data', 'cyState', 'modified')
        cy.get('@items1').eq(1).should('have.text', 'B').should('have.data', 'cyState', 'changing')
        cy.get('@items1').eq(2).should('have.text', 'A').should('have.data', 'cyState', 'modified')

        cy.get('[data-step="2"]')
        cy.get('[data-cy="circle"]').as('items2')
        cy.get('@items2').should('have.length', 3)
        cy.get('@items2').eq(0).should('have.text', 'C').should('have.data', 'cyState', 'modified')
        cy.get('@items2').eq(1).should('have.text', 'B').should('have.data', 'cyState', 'modified')
        cy.get('@items2').eq(2).should('have.text', 'A').should('have.data', 'cyState', 'modified')
    })
})