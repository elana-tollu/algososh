import { ceil } from 'cypress/types/lodash';
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

})