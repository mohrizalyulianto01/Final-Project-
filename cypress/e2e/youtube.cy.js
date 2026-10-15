import YoutubePage from "../support/pages/youtubePage";

Cypress.on("uncaught:exception", () => false);

describe("YouTube E2E Testing", () => {
  const youtube = new YoutubePage();

  beforeEach(() => {
    cy.viewport(1920, 1080); 
  });

  it("Open Gaming and verify trending video", () => {
    youtube.visit();
    youtube.acceptConsentIfPresent();

    youtube.clickGaming();
    cy.url({ timeout: 15000 }).should("include", "/gaming");

    cy.contains(/trending/i, { timeout: 15000 }).should("exist");

    cy.get("body").then(($body) => {
      const $viewAll = $body
        .find("a")
        .filter((_, el) => /view all|lihat semua/i.test(el.innerText));
      if ($viewAll.length) cy.wrap($viewAll.first()).click({ force: true });
    });

    youtube.getVideoTitle().should("have.length.greaterThan", 2);

    youtube
      .getVideoTitle()
      .eq(2)
      .then(($title) => {
        const expectedTitle = $title.text().replace(/\s+/g, " ").trim();
        const href = $title.attr("href");

        cy.get(`a[href="${href}"]`).filter(":visible").first().click();

        cy.url({ timeout: 15000 }).should("include", "/watch");

        youtube
          .getWatchTitle()
          .should("be.visible")
          .invoke("text")
          .then((t) => t.replace(/\s+/g, " ").trim())
          .should("include", expectedTitle.slice(0, 30)); 

        youtube.getChannelName().should("be.visible");
      });
  });
});