import AgodaPage from "../support/pages/agodaPage";

describe("Agoda E2E Testing", () => {
  const agoda = new AgodaPage();

  it("Inspect Agoda flight form", () => {
    agoda.visit();

    cy.viewport(1920, 1080);

    agoda.inspectFlightForm();
  });
});
