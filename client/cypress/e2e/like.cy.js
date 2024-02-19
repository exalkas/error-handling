describe("Like", () => {
  it("should find a post and like it", () => {
    cy.login();

    cy.get(":nth-child(8) > :nth-child(6) > .text-red-500").click();
  });
});
