import { ArticleBuilder } from '../support/builders/article-builder';
import { createArticleRequest, getArticleRequest, getArticlesRequest, toggleRoutes } from '../support/routes';
import { MockData } from '../support/mock-data';
import { Article } from '../../src/app/article/article.model';
import { FormField, FormFieldType, FormHelper } from '../support/helpers';
import { SharedFormComponents } from '../support/helpers/form-components.po';
import { fixedValues } from '../support/constants';

const userName = 'henkvandebroek';
const mockingEnabled = false;

let mockData: MockData;
let builtArticles: Article[] = [];

const form = new SharedFormComponents();
const formFields: FormField[] = [
  { key: 'title', value: fixedValues.title },
  { key: 'description', value: fixedValues.description },
  { key: 'body', value: fixedValues.body, type: FormFieldType.TextArea },
  { key: 'tag-list', value: fixedValues.tagList, type: FormFieldType.TagList },
];

before(() => {
  cy.login().then(async () => {
    cy.resetState(userName).then(async () => {
      await configureTestData();
      cy.log('Testdata has been configured!');
    });
  });
});

describe('Articles - Create articles', () => {
  beforeEach(() => {
    cy.server();
    toggleRoutes(userName, mockingEnabled, mockData);
  });

  it('should show an overview of favorited articles of profile', () => {
    cy.visit(`/profile/${userName}/favorites`);

    cy.wait(getArticlesRequest);
    cy.getElement('article-preview').should('have.length', 2);

    cy.contains('New Article').should('be.visible');
    cy.getElement('edit-profile-settings').should('be.visible');
  });

  it('should create an article', () => {
    cy.visit(`/editor`);

    cy.get('[id=title]').should('be.visible').type(`other option for getting ${fixedValues.title}`);
    cy.getElement('title-input').should('be.visible').clear().type(`${fixedValues.title}`);
    cy.getElement('description-input').should('be.visible').type(fixedValues.description);
    cy.invokeValue('body-input', fixedValues.body);
    fixedValues.tagList.forEach((tag) => {
      form
        .getFormFieldBySelector('tag-list')
        .should('be.visible')
        .type(`${String(tag)}{enter}`)
        .then(() => {
          cy.getElement('tag-name').should('contain.text', tag);
        });
    });

    form.clickSubmitButton();

    cy.wait(createArticleRequest);
    cy.get(createArticleRequest).its('status').should('eq', 200);
    cy.get(createArticleRequest).its('responseBody').should('exist').as('article');

    cy.get('@article').then((articleWrapper: any) => {
      cy.location('pathname').should('eq', `/article/${articleWrapper.article.slug}`);
    });

    cy.wait(getArticleRequest);
    cy.getElement('title').should('contain.text', fixedValues.title);
    cy.getElement('body').should('contain.text', fixedValues.body);
  });

  it('should create an article using a FormHelper', () => {
    cy.visit(`/editor`);

    FormHelper.fillForm(formFields);
    form.clickSubmitButton();

    cy.wait(createArticleRequest);
    cy.get(createArticleRequest).its('status').should('eq', 200);
    cy.get(createArticleRequest).its('responseBody').should('exist').as('ticket');
  });

  afterEach(() => {});
});

after(() => {
  // Do something which runs once after all tests in the block
});

async function configureTestData(): Promise<void> {
  builtArticles.push((await new ArticleBuilder().withTitle('Cypress tutorial').asFavorite().build()).article);
  builtArticles.push((await new ArticleBuilder().withTitle('Cypress getting started').asFavorite().build()).article);
}
