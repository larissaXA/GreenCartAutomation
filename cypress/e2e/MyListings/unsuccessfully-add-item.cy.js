import { TEXTS } from '../../support/texts.js'
import { SELECTORS } from '../../support/selectors.js'

describe("Tests to validate unsuccessful tries to add new item", () => {
    beforeEach(() => {
        cy.visit(Cypress.config().baseUrl)
        cy.get("a").contains(TEXTS.buttons.login).click()
        cy.wait(1000)
        cy.fixture("accounts").then((account) => {
            cy.login(account.validAccount.email, account.validAccount.password)
        })
        cy.get("a").contains(TEXTS.buttons.myListings).click()
        cy.url().should('eq', Cypress.config().baseUrl + Cypress.env("urls").myListings);
        cy.get("button").contains(TEXTS.buttons.addProduct).click()
    })

    it("Verify that user CANNOT add a product without name", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                "",
                item.newItem.description,
                item.newItem.price,
                item.newItem.expiry,
                item.newItem.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
        cy.get(SELECTORS.myListingsPage.name).then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that user CANNOT add a product without description", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                "",
                item.newItem.price,
                item.newItem.expiry,
                item.newItem.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
        cy.get(SELECTORS.myListingsPage.description).then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that user CANNOT add a product with price equals 0", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                item.newItem.description,
                "0",
                item.newItem.expiry,
                item.newItem.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with price less than 0", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                item.newItem.description,
                -1,
                item.newItem.expiry,
                item.newItem.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with discounted price less than 0", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                item.newItem.description,
                item.newItem.price,
                item.newItem.expiry,
                -1,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with discounted price bigger than price", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                item.newItem.description,
                2,
                item.newItem.expiry,
                5,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with an expiry date less than 0", () => {
        cy.fixture("item").then((item) => {
            cy.addNewProduct(
                item.newItem.name,
                item.newItem.description,
                item.newItem.price,
                -1,
                item.newItem.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })
})