import { ArticleBuilder } from "../support/builders/article-builder";
import { Article } from "../../src/app/article/article.model";

let builtArticles: Article[] = [];
before(() => {
  cy.login().then(async () => {
    await configureTestData();
    cy.log("Testdata has been configured!");
  });
});

describe("Authentication - Login functionality", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("/profile/henkvandebroek");
  });

  it("loads examples", () => {
    cy.contains(`${builtArticles[0].title}`).should("exist").click();
  });
});

async function configureTestData(): Promise<void> {
  builtArticles.push(
    (await new ArticleBuilder().withTitle("Some Fancy Sjmancy Title").build())
      .article
  );
  console.log(builtArticles);
  // builtArticles.push(await new ArticleBuilder().withTags(["Test"]).build());
}
