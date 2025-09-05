import { SELECTORS } from "./selectors"
import { TEXTS } from "./texts"

Cypress.Commands.add("login", (email, password) => {
  if(email != ""){
    cy.get("#email").clear().type(email)
  }
  if(password != ""){
    cy.get("#password").type(password)
  }
  cy.get("[type=submit]").click()
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