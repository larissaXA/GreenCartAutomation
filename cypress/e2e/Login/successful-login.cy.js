describe("Test cases to validate successful login via UI", () => {
    it("Verify that user can access the Login page", () => {
        cy.visit("/")
        cy.get("a").contains("Login").click()

        cy.url().should("eq", "http://127.0.0.1:8000/auth/login/")
    })
})