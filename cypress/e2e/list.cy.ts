import {ListState} from '../../src/components/list-page/utils';

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

    it('add to head', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить в head').click()

        cy.get(`[data-cy-state=${ListState.ADDING}]`).should('exist')
        cy.get('[data-cy="circle"]').first().as('item1')
        cy.get('@item1')
            .find('[data-cy=head]')
            .find('[data-cy=circle]')
            .should('have.text', 'A')
            .should('have.data', 'cyState', 'changing')

        cy.get(`[data-cy-state=${ListState.JUST_ADDED}]`).should('exist')
        cy.get('[data-cy="circle"]').first().as('item0')
        cy.get('@item0')
            .should('have.data', 'cyState', 'modified')
        cy.get('@item0')
            .find('[data-cy="head"]')
            .should('have.text', 'head')
        cy.get('@item0')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
            
        cy.get(`[data-cy-state=${ListState.DEFAULT}]`).should('exist')        
    })

    it('add to tail', () => {
        cy.get('[data-cy="item-to-add"]').type('A')
        cy.contains('Добавить в tail').click()

        cy.get(`[data-cy-state=${ListState.ADDING}]`).should('exist')
        cy
            .get('[data-test-id=list]')
            .children()
            .filter('[data-cy="circle"]').last().as('item2')
        cy.get('@item2')
            .find('[data-cy=head]')
            .find('[data-cy=circle]')
            .should('have.text', 'A')
            .should('have.data', 'cyState', 'changing')

        cy.get(`[data-cy-state=${ListState.JUST_ADDED}]`).should('exist')
        cy.get('[data-cy="circle"]').last().as('itemL')
        cy.get('@itemL')
            .should('have.data', 'cyState', 'modified')
        cy.get('@itemL')
            .find('[data-cy="tail"]')
            .should('have.text', 'tail')
        cy.get('@itemL')
            .find('[data-cy="main"]')
            .should('have.text', 'A')
            
        cy.get(`[data-cy-state=${ListState.DEFAULT}]`).should('exist')        
    })

    it('remove from head', () => {
        cy.contains('Удалить из head').click()

        cy.get(`[data-cy-state=${ListState.REMOVING}]`).should('exist')
        cy.get('[data-cy="circle"]').first().as('item1')
            .should('have.data', 'cyState', 'changing')        

        cy.get(`[data-cy-state=${ListState.JUST_REMOVED}]`).should('exist')
        cy.get('[data-cy="circle"]').first().as('item0')
        cy.get('@item0')
            .should('have.data', 'cyState', 'default')
        cy.get('@item0')
            .find('[data-cy="main"]').should('be.empty')
        cy.get('@item0')
            .find('[data-cy="tail"]')
            .find('[data-cy=circle]')
            .should('have.data', 'cyState', 'changing')
            
        cy.get(`[data-cy-state=${ListState.DEFAULT}]`).should('exist')        
    })

    it('remove from tail', () => {
        cy.contains('Удалить из tail').click()

        cy.get(`[data-cy-state=${ListState.REMOVING}]`).should('exist')
        cy.get('[data-test-id=list]')
            .children()
            .filter('[data-cy="circle"]').last().as('item2')
        cy.get('@item2')
            .should('have.data', 'cyState', 'changing')        

        cy.get(`[data-cy-state=${ListState.JUST_REMOVED}]`).should('exist')
        cy.get('[data-test-id=list]')
            .children()
            .filter('[data-cy="circle"]').last().as('item2')
        cy.get('@item2')
            .should('have.data', 'cyState', 'default')
        cy.get('@item2')
            .find('[data-cy="main"]').should('be.empty')
        
        cy.get('[data-test-id=list]')
            .children()
            .filter('[data-cy="circle"]').last().as('item0')
        cy.get('@item0')
            .find('[data-cy="tail"]')
            .find('[data-cy=circle]')
            .should('have.data', 'cyState', 'changing')
            
        cy.get(`[data-cy-state=${ListState.DEFAULT}]`).should('exist')        
    })

    it('add by index', () => {
        cy.get('[data-test-id=list]')
            .children()
            .filter('[data-cy="circle"]')
            .find('[data-cy="main"]')
            .then(circles => {
                const expectedItems = circles
                    .map((index, circle) => Cypress.$(circle).text())
                    .toArray()
                expectedItems.splice(1, 0, 'A')

                cy.get('[data-cy="item-to-add"]').type('A')
                cy.get('[data-cy="index-to-add"]').type('1')
                cy.contains('Добавить по индексу').click()
        
                cy.get(`[data-cy-state=${ListState.ADDING}]`).should('exist')        
        
                cy.get(`[data-cy-state=${ListState.JUST_ADDED}]`).should('exist')
        
                cy.get(`[data-cy-state=${ListState.DEFAULT}]`).should('exist')     
        
                cy.get('[data-test-id=list]')
                    .children()
                    .filter('[data-cy="circle"]')
                    .find('[data-cy="main"]')
                    .then(circles => circles
                        .map((index, circle) => Cypress.$(circle).text())
                        .toArray()
                    )
                    .as('actualItems')
                    
                cy.get('@actualItems').then(actualItems => {
                    expect(actualItems).to.deep.eq(expectedItems)
                })
            })
    })

    it('remove by index', () => {
        cy.get('[data-test-id=list]')
            .children()
            .filter('[data-cy="circle"]')
            .find('[data-cy="main"]')
            .then(circles => {
                const expectedItems = circles
                    .map((index, circle) => Cypress.$(circle).text())
                    .toArray()
                expectedItems.splice(1, 1)

                cy.get('[data-cy="index-to-add"]').type('1')
                cy.contains('Удалить по индексу').click()
        
                cy.get(`[data-cy-state=${ListState.REMOVING}]`).should('exist')        
        
                cy.get(`[data-cy-state=${ListState.JUST_REMOVED}]`).should('exist')
        
                cy.get(`[data-cy-state=${ListState.DEFAULT}]`).should('exist')     
        
                cy.get('[data-test-id=list]')
                    .children()
                    .filter('[data-cy="circle"]')
                    .find('[data-cy="main"]')
                    .then(circles => circles
                        .map((index, circle) => Cypress.$(circle).text())
                        .toArray()
                    )
                    .as('actualItems')
                    
                cy.get('@actualItems').then(actualItems => {
                    expect(actualItems).to.deep.eq(expectedItems)
                })
            })
    })


})