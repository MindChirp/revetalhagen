import React from "react";
import Header from "./header";

describe("<Header />", () => {
  it("renders", () => {
    cy.viewport(1000, 500);
    // see: https://on.cypress.io/mounting-react
    const header = cy.mount(<Header />);
    header.get("header").should("be.visible");
    header.should("contain.text", "Revetalhagen");
    header.should("contain.text", "Medlemsområde");
    header.should("contain.text", "Utleie");
    header.should("contain.text", "Nyheter");
  });
  it("Opens profile popover", () => {
    cy.viewport(1000, 500);
    const header = cy.mount(<Header />);
    header.get("header").should("be.visible");
    header.get("[cy-data=avatar-button]").click();

    const popover = header.get("[cy-data=popover-content]");
    popover.should("be.visible");
    popover.get("button").should("contain.text", "Admin");
    popover.get("button").should("contain.text", "Min side");
    popover.get("button").should("contain.text", "Logg ut");
  });
});
