describe('routing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
    })

    it('string', () => {
        cy.get('[data-cy="string"]').click()
        cy.contains('Строка')
        cy.url().should('include', '/recursion')
    })

    it('fibonacci', () => {
        cy.get('[data-cy="fibonacci"]').click()
        cy.contains('Фибоначчи')
        cy.url().should('include', '/fibonacci')
    })

    it('sorting', () => {
        cy.get('[data-cy="sorting"]').click()
        cy.contains('Сортировка')
        cy.url().should('include', '/sorting')
    })

    it('stack', () => {
        cy.get('[data-cy="stack"]').click()
        cy.contains('Стек')
        cy.url().should('include', '/stack')
    })

    it('queue', () => {
        cy.get('[data-cy="queue"]').click()
        cy.contains('Очередь')
        cy.url().should('include', '/queue')
    })

    it('list', () => {
        cy.get('[data-cy="list"]').click()
        cy.contains('список')
        cy.url().should('include', '/list')
    })
  })