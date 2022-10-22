export function loginMe() {

    cy.get('.navbar').should('be.visible').as('appHeader');

    cy.get('@appHeader').find('a[href$="/login"]').click();
    cy.url().should('include', '/#/login');

    cy.get('.auth-page').should('be.visible').as('loginPage');
    cy.get('@loginPage').find('h1').should('have.text', 'Sign in');
    cy.get('@loginPage').find('form').should('be.visible').as('loginForm');

    cy.get('@loginForm').find('input[ng-model$=email]').type(meUser.email);
    cy.get('@loginForm').find('input[ng-model$=password]').type(meUser.password);
    cy.get('@loginForm').find('button[type=submit]').click();

    cy.get('@appHeader').should('contain.text', meUser.username);
}
export function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min)) + min;
}