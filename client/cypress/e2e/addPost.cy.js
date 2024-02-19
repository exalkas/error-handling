/// <reference types="Cypress" />
it("adds a post", () => {
  cy.visit("http://localhost:5173/login");

  cy.contains("Login");

  const username = cy.get("input[type=text]");
  username.type("a31");

  cy.get('input[name="password"]').type("12345");
  cy.get("#loginButton").click();

  cy.contains("a31");

  cy.visit("http://localhost:5173/add");
  cy.get('[type="text"]').type("cypress creates a post now");

  cy.get("textarea").type("typed something in the text area");

  cy.get(".flex-col > button").click();

  cy.visit("http://localhost:5173");

  cy.contains("cypress creates a post now");
});
