import { SELECTORS } from "../../support/selectors";
import { TEXTS } from "../../support/texts.js"

describe("Usability validations at Cart Page", () => {
  beforeEach(() => {
    cy.fixture("accounts").then((account) => {
        cy.login(
            account.validAccount.email,
            account.validAccount.password
        )
        cy.ensureCartHasItem()
    })
  })

  const viewports = [
        { name: "desktop", width: 1280, height: 800 },
        { name: "tablet", width: 768, height: 1024 },
        { name: "mobile", width: 375, height: 667 }
   ]

  viewports.forEach((vp) => {
    it(`Verify cart layout responsiviness on ${vp.name}`, () => {
        cy.viewport(vp.width, vp.height)
        cy.wait(1000)

        cy.get(SELECTORS.cartPage.cartItem).should("have.length.greaterThan", 0)
        cy.get(SELECTORS.cartPage.itemName).should("be.visible")
        cy.get(SELECTORS.cartPage.quantityField).should("be.visible")
        cy.get("button").contains(TEXTS.buttons.removeFromCart).should("be.visible")
        cy.get(SELECTORS.cartPage.itemPrices).should("be.visible")
        cy.get("a").contains(TEXTS.buttons.checkout).should("be.visible")

        cy.get("a").contains(TEXTS.buttons.checkout).click()
    })
})

  it("Verify cart persistence after page refresh", () => {
        cy.get(SELECTORS.cartPage.cartItem).then(($itemsBefore) => {
            const itemCount = $itemsBefore.length
            cy.reload()
            cy.get(SELECTORS.cartPage.cartItem).should("have.length", itemCount)
        })
  })
})
