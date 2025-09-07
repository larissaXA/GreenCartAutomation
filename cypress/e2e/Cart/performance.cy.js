import { SELECTORS } from "../../support/selectors";
import { TEXTS } from "../../support/texts.js"

describe("Performance validations at Cart Page", () => {
  beforeEach(() => {
    cy.validLogin()
    cy.ensureCartHasItem()
  })

  it("Verify response time when updating item quantity", () => {
    let quantity = 5
    let startTime = performance.now()
    let endTime

    cy.get(SELECTORS.cartPage.cartItem).first().find(SELECTORS.cartPage.quantityField).clear().type(quantity)

    cy.get(SELECTORS.cartPage.itemPrices).then((prices) => { 
        const pricesArray = prices.toArray().map((el) =>
            parseFloat(Cypress.$(el).text().replace(/[^0-9.]/g, ""))
        )

        cy.wrap(pricesArray[0] * quantity).should("eq", pricesArray[1]).then(() => {
            endTime = performance.now()
            const duration = endTime - startTime
            expect(duration).to.be.lessThan(2000)
        })
    })
  })

  it("Verify response time when removing products", () => {
    let qnttBeforeRemoval

    cy.intercept("POST", Cypress.env("urls").cart + "/remove/**").as("updateCart")

    cy.get(SELECTORS.cartPage.cartItem).then((items) => {
        let startTime
        let endTime

        qnttBeforeRemoval = items.length

        startTime = performance.now()
        cy.get(SELECTORS.cartPage.cartItem).first().find("button").contains(TEXTS.buttons.removeFromCart).click()

        cy.wait("@updateCart").then((interception) => {
            expect(interception.response.statusCode).to.eq(302)
        })
        cy.get(SELECTORS.cartPage.cartItem).should("have.length", qnttBeforeRemoval - 1).then(() => {
            endTime = performance.now()
            const duration = endTime - startTime
            expect(duration).to.be.lessThan(2000)
        })
    })
  })
})
