/// <reference types="cypress" />

describe('fibonacci', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/fibonacci')
    })

    it('disabled when empty', () => {
        cy.get('[data-cy="fibonacci-to-run"]').should('be.empty')
        cy.contains('Рассчитать').should('be.disabled')  
    })

    it('generates correctly', () => {
        cy.get('[data-cy="fibonacci-to-run"]').type('5')
        cy.contains('Рассчитать').click()

        cy.get('[data-step="1"]')
        cy.get('[data-cy=circle]')
        .find('[data-cy=main]')
        .should('have.length', 1)
        .last().should('have.text', '0')

        cy.get('[data-step="2"]')
        cy.get('[data-cy=circle]')
        .find('[data-cy=main]')
        .should('have.length', 2)
        .last().should('have.text', '1')

        cy.get('[data-step="3"]')
        cy.get('[data-cy=circle]')
        .find('[data-cy=main]')
        .should('have.length', 3)
        .last().should('have.text', '1')

        cy.get('[data-step="4"]')
        cy.get('[data-cy=circle]')
        .find('[data-cy=main]')
        .should('have.length', 4)
        .last().should('have.text', '2')

        cy.get('[data-step="5"]')
        cy.get('[data-cy=circle]')
        .find('[data-cy=main]')
        .should('have.length', 5)
        .last().should('have.text', '3')
    })
})