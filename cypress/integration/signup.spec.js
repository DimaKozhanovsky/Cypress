
import { getRandomNumber } from '../support/utilits';

import meUser from '../fixtures/me-user.json';
function loginMe() {

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


describe('Sign up', () => {
    // will be executed before each it()
    beforeEach(() => {
        cy.visit('/');
    });

    it('should do register user', () => {



        cy.get('.navbar a[href$="/register"]').click();
        cy.url().should('include', '/#/register');

        cy.get('.auth-page').as('registerPage');
        cy.get('@registerPage').find('h1').should('have.text', 'Sign up');
        cy.get('@registerPage').find('form').should('be.visible').as('registerForm');

        const rnd = getRandomNumber(1000, 9999);

        const username = 'user_' + rnd;
        const email = username + '@gmail.com';
        cy.get('.auth-page form input[ng-model$=username]').type(username);
        cy.get('.auth-page form input[ng-model$=email]').type(email);
        cy.get('.auth-page form input[ng-model$=password]').type('xyzXYZ123_');
        cy.get('@registerForm').find('button[type=submit]').click();

        cy.get('.navbar').should('contain.text', username);

    });

    it('should do login user', () => {
        loginMe()
    });

    it('should do logout user', () => {

        const username = 'test_anton';

        // for login
        loginMe()

        // for logout
        cy.get('.navbar a[href$="/settings"]').click();
        cy.get('.settings-page h1').should('have.text', 'Your Settings');
        // TODO: improve selector to button[data-cy=logout]
        cy.get('.settings-page button[ng-click*=logout]').click();

        cy.get('.navbar').should('not.contain.text', username);
    });

});