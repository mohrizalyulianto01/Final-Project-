class AgodaPage {
  visit() {
    cy.visit('https://www.agoda.com');
  }

  inspectFlightForm() {
    cy.get("input:visible").then(($inputs) => {
      const inputData = [...$inputs].map((el, index) => ({
        index,
        placeholder: el.getAttribute("placeholder"),
        ariaLabel: el.getAttribute("aria-label"),
        type: el.type,
        value: el.value,
      }));

      console.table(inputData);
    });
  }
}

export default AgodaPage;

