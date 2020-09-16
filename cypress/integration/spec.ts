import { ArticleBuilder } from '../support/builders/article-builder';
import { toggleRoutes } from '../support/routes';
import { MockData } from '../support/mock-data';
import { Article } from '../../src/app/article/article.model';
import { FormField, FormHelper } from '../support/helpers';
import { SharedFormComponents } from '../support/helpers/form-components.po';
import { fixedValues } from '../support/constants';

const user = 'henkvandebroek';
const mockingEnabled = false;

let mockData: MockData;
let builtArticles: Article[] = [];

const form = new SharedFormComponents();
const formFields: FormField[] = [
  { key: 'title', value: fixedValues.title },
  { key: 'description', value: fixedValues.description },
  { key: 'body', value: fixedValues.body },
  { key: 'tagList', value: fixedValues.tagList },
];

before(() => {
  cy.login().then(async () => {
    await configureTestData();
    cy.log('Testdata has been configured!');
  });
});

describe('Articles - Create articles', () => {
  beforeEach(() => {
    cy.server();
    toggleRoutes(user, mockingEnabled, mockData);

    cy.visit(`/profile/${user}`);
  });

  it('should create an article from the s examples', () => {
    cy.contains(`${builtArticles[0].title}`).should('exist').click();

    fixedValues.tagList.forEach((tag) => {
      form
        .getFormFieldBySelector('tag-list')
        .should('be.visible')
        .type(`${String(tag)}{enter}`)
        .then(() => {
          cy.getElement('tag-name').should('have.text', tag);
        });
    });
  });

  it('should create an article from the s examples', () => {
    FormHelper.fillForm(formFields);
    form.clickSubmitButton();
  });
});

async function configureTestData(): Promise<void> {
  builtArticles.push((await new ArticleBuilder().withTitle('Some Fancy Sjmancy Title').build()).article);

  // builtArticles.push(await new ArticleBuilder().withTags(["Test"]).build());
}
