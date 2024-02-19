// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.Commands.add("login", () => {
  cy.visit("http://localhost:5173/login");

  cy.contains("Login");

  const username = cy.get("input[type=text]");
  username.type("a31");

  cy.get('input[name="password"]').type("12345");
  cy.get("#loginButton").click();

  cy.contains("a31");
});