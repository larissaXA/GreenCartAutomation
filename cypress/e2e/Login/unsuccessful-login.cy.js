describe("Test cases to validate successful login via UI", () => {
    beforeEach(() => {
        cy.visit("/auth/login")
    })

    it("Verify that it is NOT possible to login with an unregistered account", () => {
        cy.get("#email").type("t@gmail.com")
        cy.get("#password").type("password")
        cy.get('[type="submit"]').click()

        cy.url().should("eq", "http://127.0.0.1:8000/auth/login/")
        cy.get("#alert").should("contain", "Login failed. Please check your username and password.")
    })

    it("Verify that it is NOT possible to login with a blank email field", () => {
        cy.get("#password").type("passwordTest")
        cy.get('[type="submit"]').click()

        cy.url().should("eq", "http://127.0.0.1:8000/auth/login/")
        cy.get('#email').then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that it is NOT possible to login with a blank password field", () => {
        cy.get("#email").type("t@gmail.com")
        cy.get('[type="submit"]').click()

        cy.url().should("eq", "http://127.0.0.1:8000/auth/login/")
        cy.get('#password').then(($input) => {
            expect($input[0].validity.valueMissing).to.be.true
        })
    })

    it("Verify that it is NOT possible to login with any value different that an email at the email field", () => {
        cy.get("#email").type("gmail.com")
        cy.get("#password").type("passwordTest")
        cy.get('[type="submit"]').click()

        cy.url().should("eq", "http://127.0.0.1:8000/auth/login/")
        cy.get('#email').then(($input) => {
            expect($input[0].validity.typeMismatch).to.be.true
        })
    })
})