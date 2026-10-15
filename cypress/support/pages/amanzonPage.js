class AmazonPage {
  visit() {
    cy.visit('https://www.amazon.com');
  }

  searchProduct(product) {
    cy.get("#twotabsearchtextbox")
      .should("be.visible")
      .type(`${product}{enter}`);
  }

  sortByHighestPrice() {
    cy.get("#s-result-sort-select")
      .click("Price: High to Low");
  }

  getProducts() {
    return cy.get('[data-component-type="s-search-result"]');
  }
}

export default AmazonPage;
