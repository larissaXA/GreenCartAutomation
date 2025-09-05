import { TEXTS } from '../../support/texts.js'
import { SELECTORS } from '../../support/selectors.js'

describe("Test cases to validate successful login via UI", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("urls").login)
    })

    it("Verify that it is NOT possible to login with an unregistered account", () => {
        cy.fixture("accounts").then((account) => {
            cy.login(account.invalidAccount.email, account.invalidAccount.password)
        })

        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").login)
        cy.get(SELECTORS.loginPage.alert).should("contain", TEXTS.alerts.unregisteredAccount)
    })

    it("Verify that it is NOT possible to login with a blank email field", () => {
        cy.fixture("accounts").then((account) => {
            cy.login("", account.validAccount.password)
        })

        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").login)
        cy.get(SELECTORS.loginPage.emailField).then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that it is NOT possible to login with a blank password field", () => {
        cy.fixture("accounts").then((account) => {
            cy.login(account.validAccount.email, "")
        })

        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").login)
        cy.get(SELECTORS.loginPage.passwordField).then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that it is NOT possible to login with any value different that an email at the email field", () => {
        cy.fixture("accounts").then((account) => {
            cy.login("gmail.com", account.validAccount.password)
        })

        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").login)
        cy.get(SELECTORS.loginPage.emailField).then(($input) => {
            expect($input[0].validity.typeMismatch).to.be.true
        })
    })
})