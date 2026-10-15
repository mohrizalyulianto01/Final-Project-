
import AmazonPage from "../support/pages/amanzonPage"

describe("Amazon E2E Testing", () => {
  const amazon = new AmazonPage();

  it("Search chair and verify product name and price", () => {
    amazon.visit();

    cy.viewport(1920, 1080);

    amazon.searchProduct("chair");

    cy.get("#s-result-sort-select")
      .should("be.visible")
      .select("Price: High to Low");

    cy.wait(3000);

    amazon.getProducts()
      .filter(":visible")
      .then(($products) => {
        const products = [...$products];

        const nonSponsoredProducts = products.filter(($product) => {
          const text = $product.innerText.toLowerCase();

          return (
            !text.includes("sponsored") &&
            $product.querySelector("h2") &&
            $product.querySelector(".a-price-whole")
          );
        });

        expect(nonSponsoredProducts.length)
          .to.be.greaterThan(0);

        // Pilih produk paling kanan pada baris pertama.
        const firstRow = nonSponsoredProducts.filter(($product) => {
          const top = $product.getBoundingClientRect().top;

          return (
            top -
            nonSponsoredProducts[0].getBoundingClientRect().top
          ) < 50;
        });

        const selected = firstRow.reduce((rightmost, current) => {
          return current.getBoundingClientRect().right >
            rightmost.getBoundingClientRect().right
            ? current
            : rightmost;
        });

        const productName = selected.querySelector("h2")
          .innerText.trim();

        const price = selected.querySelector(".a-price-whole")
          .innerText.replace(/[^\d]/g, "");

        cy.wrap(selected).click();

        cy.get("#productTitle")
          .should("be.visible")
          .invoke("text")
          .then((detailName) => {
            expect(detailName.trim()).to.equal(productName);
          });

        cy.get(".a-price-whole")
          .first()
          .invoke("text")
          .then((detailPrice) => {
            const actualPrice = detailPrice.replace(/[^\d]/g, "");

            expect(actualPrice).to.equal(price);
          });
      });
  });
});
