import { SELECTORS } from "../../support/selectors.js"
import { TEXTS } from "../../support/texts.js"

describe("Tests to validate removing an item from the My Listings catalog", () => {
    beforeEach(() => {
        cy.fixture("accounts").then((account) => {
            cy.login(account.validAccount.email,account.validAccount.password)
        })
    })

    it("Verify that user can delete an existing product", () => {
        cy.get("a").contains(TEXTS.buttons.myListings).click()
        cy.url().should('eq', Cypress.config().baseUrl + Cypress.env("urls").myListings);

        cy.document().then((doc) => {
                const items = doc.querySelectorAll(SELECTORS.myListingsPage.productCard)
                let quantityBeforeDeletion = items.length
                let quantityAfterDeletion = 0

                if(items.length == 0){
                    cy.addNewProduct("Item", "Description", '5', '3', '3')
                    quantityBeforeDeletion += 1
                }

                cy.get('button').contains('Delete').last().click()
                cy.get('button').contains('Yes').click()
                cy.get('#deleteModal').should("not.be.visible")

                cy.document().then((doc) => {
                    const items = doc.querySelectorAll(SELECTORS.myListingsPage.productCard)
                    quantityAfterDeletion = items.length

                    cy.wrap(quantityBeforeDeletion).should('equal', quantityAfterDeletion + 1)
                })
            }
        )
    })
})