import { TEXTS } from '../../support/texts.js'
import { SELECTORS } from '../../support/selectors.js'

describe("Tests to validate unsuccessful tries to add new item", () => {
    beforeEach(() => {
        cy.validLogin()
        cy.get("a").contains(TEXTS.buttons.myListings).click()
        cy.url().should('eq', Cypress.config().baseUrl + Cypress.env("urls").myListings);
        cy.get("button").contains(TEXTS.buttons.addProduct).click()
    })

    it("Verify that user CANNOT add a product without name", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                "",
                item.newItem1.description,
                item.newItem1.price,
                item.newItem1.expiry,
                item.newItem1.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
        cy.get(SELECTORS.myListingsPage.name).then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that user CANNOT add a product without description", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                "",
                item.newItem1.price,
                item.newItem1.expiry,
                item.newItem1.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
        cy.get(SELECTORS.myListingsPage.description).then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that user CANNOT add a product with price equals 0", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                item.newItem1.description,
                "0",
                item.newItem1.expiry,
                item.newItem1.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with price less than 0", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                item.newItem1.description,
                -1,
                item.newItem1.expiry,
                item.newItem1.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with discounted price less than 0", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                item.newItem1.description,
                item.newItem1.price,
                item.newItem1.expiry,
                -1,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with discounted price bigger than price", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                item.newItem1.description,
                2,
                item.newItem1.expiry,
                5,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })

    it("Verify that user CANNOT add a product with an expiry date less than 0", () => {
        cy.fixture("items").then((item) => {
            cy.addNewProduct(
                item.newItem1.name,
                item.newItem1.description,
                item.newItem1.price,
                -1,
                item.newItem1.discount,
            )
        })

        cy.wait(2000)
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").createProduct)
    })
})