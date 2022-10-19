/// <reference types="cypress" />

describe('application', () => {
  it('is up', () => {
    cy.visit('http://localhost:3000/')
    cy.contains('МБОУ АЛГОСОШ')
  })
})