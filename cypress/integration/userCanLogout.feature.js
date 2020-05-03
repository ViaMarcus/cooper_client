describe('User can log out', () => {
    beforeEach(() => {
      cy.server();
      cy.visit('/');
      cy.get("button#login").click();
      cy.get('div#form').within(()=>{
          cy.get('email').type('user@email.com');
          cy.get('password').type('password');
          cy.get('button#submit').click();
      })
    });

    it('via the logout button', () => {
        cy.get("button#logout").click();
        cy.get('button#login').should('exist');
    })

});