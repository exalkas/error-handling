it("is a hello world test", () => {
  cy.visit("http://localhost:5173/login");

  cy.contains("Login");
  console.log("Visited");
  // alert("Hello from Cypress");
});
