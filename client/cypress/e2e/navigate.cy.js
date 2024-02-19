describe("Navigate", () => {
  it("should login and navigate the app", () => {
    cy.visit("http://localhost:5173/login");

    cy.contains("Login");

    const username = cy.get("input[type=text]");
    username.type("a31");

    cy.get('input[name="password"]').type("12345");
    cy.get("#loginButton").click();

    cy.contains("a31");
  });
});
