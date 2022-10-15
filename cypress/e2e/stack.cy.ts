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

        cy.get('@items0')
            .should('have.data', 'cyState', 'default')

        cy.get('[data-cy="item-to-add"]').type('B')
        cy.contains('Добавить').click()
        
        cy.get('[data-cy="circle"]').as('items1')
            .should('have.length', 2)
        cy.get('@items1').eq(0).as('items1-1')
        cy.get('@items1').eq(1).as('items1-2')

        cy.get('@items1-1')
            .should('have.data', 'cyState', 'default')
        cy.get('@items1-1')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
        cy.get('@items1-1')
            .find('[data-cy="head"]')
            .should('be.empty')
        cy.get('@items1-1')
            .find('[data-cy="index"]')
            .should('have.text', '0')

        cy.get('@items1-2')
            .should('have.data', 'cyState', 'changing')
        cy.get('@items1-2')
            .find('[data-cy="main"]')
            .should('have.text', 'B')
        cy.get('@items1-2')
            .find('[data-cy="head"]')
            .should('have.text', 'top')
        cy.get('@items1-2')
            .find('[data-cy="index"]')
            .should('have.text', '1')

        cy.get('[data-cy=circle][data-cy-state=default]').should('have.length', 2)
        cy.get('[data-cy=circle][data-cy-state=changing]').should('not.exist')
    })

    it('pop', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить').click()
        cy.get('[data-cy="item-to-add"]').type('B')
        cy.contains('Добавить').click()
        cy.get('[data-cy=circle][data-cy-state=default]').should('have.length', 2)

        cy.contains('Удалить').click()
        cy.get('[data-cy=circle]').should('have.length', 1)
    })

    it('clean', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить').click()
        cy.get('[data-cy="item-to-add"]').type('B')
        cy.contains('Добавить').click()
        cy.get('[data-cy=circle][data-cy-state=default]').should('have.length', 2)

        cy.contains('Очистить').click()
        cy.get('[data-cy=circle]').should('not.exist')
    })
})