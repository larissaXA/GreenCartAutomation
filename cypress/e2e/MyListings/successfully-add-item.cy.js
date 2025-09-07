import { TEXTS } from '../../support/texts.js'
import { SELECTORS } from '../../support/selectors.js'

describe("Tests to validate adding an item succesfully", () => {
    beforeEach(() => {
        cy.validLogin()
        cy.get("a").contains(TEXTS.buttons.myListings).click()
        cy.url().should('eq', Cypress.config().baseUrl + Cypress.env("urls").myListings);
        cy.get("button").contains(TEXTS.buttons.addProduct).click()
    })

    it("Verify that user can add a new product", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                item.newItem1.description,
                item.newItem1.price,
                item.newItem1.expiry,
                item.newItem1.discount,
            )

            cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").myListings)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem1.name)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem1.description)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem1.price)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", `${item.newItem1.expiry} days left`)
            cy.get(SELECTORS.myListingsPage.productCard).last().should("contain", item.newItem1.discount)
        })
    })
})