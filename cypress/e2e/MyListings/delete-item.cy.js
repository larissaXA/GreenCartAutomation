describe("Tests to validate removing an item from the My Listings catalog", () => {
    beforeEach(() => {
        cy.visit("/auth/login")
        cy.login("test@gmail.com","passwordTest")
    })

    it("Verify that user can delete an existing product", () => {
        cy.get("a").contains("My Listings").click()
        cy.url().should('eq', 'http://127.0.0.1:8000/shop/mylistings/');

        cy.document().then((doc) => {
                const items = doc.querySelectorAll('.relative.mx-auto.my-6.w-full.max-w-xs.flex-col.overflow-hidden.rounded-lg.bg-white.shadow-md');
                let quantityBeforeDeletion = items.length;
                let quantityAfterDeletion = 0

                if(items.length == 0){
                    cy.addNewProduct("Item", "Description", '5', '3', '3')
                    quantityBeforeDeletion += 1
                }

                cy.get('button').contains('Delete').last().click()
                cy.get('button').contains('Yes').click()
                cy.get('#deleteModal').should("not.be.visible")

                cy.wrap(quantityBeforeDeletion).should('equal', quantityAfterDeletion + 1)
            }
        )
    })
})