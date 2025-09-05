import { TEXTS } from '../../support/texts.js'

describe("Test cases to validate successful access to login page", () => {
    it("Verify that user can access the Login page", () => {
        cy.visit("/")
        cy.get("a").contains(TEXTS.buttons.login).click()

        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").login)
    })
})