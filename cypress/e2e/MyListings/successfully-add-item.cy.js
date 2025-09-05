import { TEXTS } from '../../support/texts.js'
import { SELECTORS } from '../../support/selectors.js'

describe("Tests to validate adding an item succesfully", () => {
    beforeEach(() => {
        cy.visit(Cypress.env("urls").login)
        cy.fixture("accounts").then((account) => {
            cy.login(account.validAccount.email,account.validAccount.password)
        })
    })

    it("Verify that user can add a new product", () => {
        cy.get("a").contains(TEXTS.buttons.myListings).click()
        cy.get("button").contains(TEXTS.buttons.addProduct).first().click()
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                item.newItem.description,
                item.newItem.price,
                item.newItem.expiry,
                item.newItem.discount,
            )

            cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").myListings)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem.name)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem.description)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem.price)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", `${item.newItem.expiry} days left`)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem.discount)
        })
    })
})