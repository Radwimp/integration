describe("Sign Up", () => {
  beforeEach(() => {
    cy.visit('signup');
  });

  // it('should redirect to signup page', () => {
  //   cy.visit('trade');
  //   cy.wait(200);
  //   cy.get(':nth-child(1) > .pg-navbar__content-item').click();
  //   cy.get(':nth-child(2) > .cr-sign-in-form__option-inner').click();
  //   cy.location('pathname').should('eq', '/signup');
  // });
  //
  // it('should focus on input', () => {
  //   cy.get(':nth-child(1) > .cr-input > input').click();
  //   cy.focused().should('have.attr', 'type', 'email');
  //   cy.focused().parent().parent().should('have.class', 'cr-sign-up-form__group--focused');
  //
  //   cy.get(':nth-child(2) > .cr-input > input').click();
  //   cy.focused().should('have.attr', 'type', 'password');
  //   cy.focused().parent().parent().should('have.class', 'cr-sign-up-form__group--focused');
  //
  //   cy.get(':nth-child(3) > .cr-input > input').click();
  //   cy.focused().should('have.attr', 'type', 'password');
  //   cy.focused().parent().parent().should('have.class', 'cr-sign-up-form__group--focused');
  //
  //   cy.get(':nth-child(4) > .cr-input > input').click();
  //   cy.focused().should('have.attr', 'type', 'text');
  //   cy.focused().parent().parent().should('have.class', 'cr-sign-up-form__group--focused');
  // });
  //
  // it('should handle checkbox toggle', () => {
  //   cy.get('.cr-button').should('be.disabled');
  //   cy.get('.cr-checkbox__checkitem').click();
  //
  //   // captcha
  //   // cy.get('.cr-button').should('be.enabled');
  //   // cy.get('.cr-checkbox__checkitem').click();
  //   //
  //   // cy.get('.cr-button').should('be.disabled');
  // });

  it('should handle incorrect email value', () => {

  })
});
