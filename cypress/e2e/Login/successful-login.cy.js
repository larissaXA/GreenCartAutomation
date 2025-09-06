describe("Test cases to validate successful login via UI", () => {
    it("Verify that it is possible to login with an existent account", () => {
        cy.fixture("accounts").then((account) => {
            cy.login(account.validAccount.email, account.validAccount.password)
        })
        
        cy.url().should("eq", Cypress.config().baseUrl + Cypress.env("urls").shop)
    })
})