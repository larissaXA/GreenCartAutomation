import { SELECTORS } from "./selectors"
import { TEXTS } from "./texts"

Cypress.Commands.add("login", (email, password) => {
  cy.visit(Cypress.env("urls").login)
  if(email != ""){
    cy.get("#email").clear().type(email)
  }
  if(password != ""){
    cy.get("#password").type(password)
  }
  cy.get("[type=submit]").click()
})

Cypress.Commands.add("validLogin", () => {
    cy.fixture("accounts").then((account) => {
        cy.login(
            account.validAccount.email,
            account.validAccount.password
        )
    })
})

Cypress.Commands.add("addNewProduct", (name, description, price, expiry, discount) => {
    if(name != ""){
      cy.get(SELECTORS.myListingsPage.name).clear().type(name)
    }
    if(description != ""){
      cy.get(SELECTORS.myListingsPage.description).clear().type(description)
    }
    if(price != ""){
      cy.get(SELECTORS.myListingsPage.price).clear().type(price)
    }
    if(expiry != ""){
      cy.get(SELECTORS.myListingsPage.expiry).clear().type(expiry)
    }
    if(discount != ""){
      cy.get(SELECTORS.myListingsPage.discount).clear().type(discount)
    }
    cy.get(SELECTORS.myListingsPage.saveButton).contains(TEXTS.buttons.save).click()
  })

Cypress.Commands.add("forEachFixtureItem", (fixtureName, action) => {
        cy.fixture(fixtureName).then((items) => {
          Object.values(items).forEach((item) => {
              action(item)
        })
    })
})

Cypress.Commands.add("ensureCartHasItem", () => {
  cy.get("a").contains(TEXTS.buttons.cart).click()
  cy.wait(1500)

  cy.get("body").then((body) => {
    if (body.find("p").text().includes(TEXTS.descriptions.emptyCart)) {
      cy.get(SELECTORS.shopPage.greenCartLogo).first().click()
      cy.wait(1500)
      cy.get("button").contains(TEXTS.buttons.addToCart).first().click()
      cy.get("a").contains(TEXTS.buttons.cart).click()
      cy.wait(1500)
      cy.get(SELECTORS.cartPage.cartItem).should("have.length.greaterThan", 0)
    }
  })
})