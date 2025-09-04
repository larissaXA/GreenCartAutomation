describe("Test cases to validate successful login via UI", () => {
    before(() => {
        cy.visit("/auth/login")
    })

    it("Verify that it is possible to login with an existent account", () => {
        cy.get("#email").type("test@gmail.com")
        cy.get("#password").type("passwordTest")
        cy.get('[type="submit"]').click()
        
        cy.url().should("eq", "http://127.0.0.1:8000/shop/")
    })
})