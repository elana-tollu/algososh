describe('queue', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/queue')
    })

    it('disabled when empty', () => {
        cy.get('[data-cy="item-to-add"]').should('be.empty')
        cy.contains('Добавить').should('be.disabled')  
    })

    it('initial state', () => {
        cy.get('[data-cy="circle"]').should('have.length', 7)
            .each(circle => {
                cy.wrap(circle)
                    .should('have.data', 'cyState', 'default')
                cy.wrap(circle)
                    .find('[data-cy="main"]')
                    .should('be.empty')
            })   
    })

    it('enqueue', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить').click()
        
        cy.get('[data-cy="circle"]').as('items0')
            .should('have.length', 7)
        cy.get('@items0').eq(0).as('items0-1')
            .should('have.data', 'cyState', 'changing')
        cy.get('[data-cy-enqueueing=false]').should('exist')   
        
        cy.get('@items0-1')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
        cy.get('@items0-1')
            .find('[data-cy="head"]')
            .should('have.text', 'head')
        cy.get('@items0-1')
            .find('[data-cy="tail"]')
            .should('have.text', 'tail')
        cy.get('@items0-1')
            .find('[data-cy="index"]')
            .should('have.text', '0')

        cy.get('[data-cy-changing=false]').should('exist')   
        cy.get('@items0-1')
            .should('have.data', 'cyState', 'default')


        cy.get('[data-cy="item-to-add"]').type('B')
        cy.contains('Добавить').click()
        
        cy.get('[data-cy="circle"]').as('items1')
            .should('have.length', 7)
        cy.get('@items1').eq(0).as('items1-1')
        cy.get('@items1').eq(1).as('items1-2')

        cy.get('@items1-1')
            .should('have.data', 'cyState', 'default')
        cy.get('@items1-1')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
        cy.get('@items1-1')
            .find('[data-cy="head"]')
            .should('have.text', 'head')
        cy.get('@items1-1')
            .find('[data-cy="tail"]')
            .should('be.empty')
        cy.get('@items1-1')
            .find('[data-cy="index"]')
            .should('have.text', '0')

        cy.get('@items1-2')
            .should('have.data', 'cyState', 'changing')

        cy.get('[data-cy-enqueueing=false]').should('exist') 
        cy.get('@items1-2')
            .find('[data-cy="main"]')
            .should('have.text', 'B')
        cy.get('@items1-2')
            .find('[data-cy="head"]')
            .should('be.empty')
        cy.get('@items1-2')
            .find('[data-cy="tail"]')
            .should('have.text', 'tail')
        cy.get('@items1-2')
            .find('[data-cy="index"]')
            .should('have.text', '1')
        
        cy.get('@items1')
            .should('have.data', 'cyState', 'default')
    })
    

    it('dequeue', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить').click()
        cy.get('[data-cy="item-to-add"]').type('B')
        cy.contains('Добавить').click()

        cy.contains('Удалить').click()
        cy.get('[data-cy="circle"]').as('items0')
            .should('have.length', 7)
        cy.get('@items0').eq(0).as('items0-1')
            .should('have.data', 'cyState', 'changing')
        cy.get('[data-cy-enqueueing=false]').should('exist')   
        
        cy.get('@items0-1')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
        cy.get('@items0-1')
            .find('[data-cy="head"]')
            .should('have.text', 'head')
        cy.get('@items0-1')
            .find('[data-cy="tail"]')
            .should('have.text', 'tail')
        cy.get('@items0-1')
            .find('[data-cy="index"]')
            .should('have.text', '0')

        cy.get('[data-cy-changing=false]').should('exist')   
        cy.get('@items0-1')
            .should('have.data', 'cyState', 'default')
    })


    it('clean', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить').click()
        cy.get('[data-cy="item-to-add"]').type('B')
        cy.contains('Добавить').click()
        cy.get('[data-cy=circle][data-cy-state=default]').should('have.length', 7)

        cy.contains('Очистить').click()
        cy.get('[data-cy="circle"]').should('have.length', 7)
            .each(circle => {
                cy.wrap(circle)
                    .should('have.data', 'cyState', 'default')
                cy.wrap(circle)
                    .find('[data-cy="main"]')
                    .should('be.empty')
            })   
    })
})