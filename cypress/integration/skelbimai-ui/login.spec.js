describe('login tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/login');
    })

    it('validates email', () => {
        const emailInput = cy.get('[name="email"]').type("bad")
        emailInput.parent().parent()
            .find('[class^="common-input-field_inputError"]')
            .should("have.text", "Neteisingas el.pašto formatas")
    })
})
