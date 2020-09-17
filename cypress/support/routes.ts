import { MockData } from './mock-data';

export const getProfileRequest = '@getProfileRequest';
export const getArticlesRequest = '@getArticlesRequest';
export const getArticleRequest = '@getArticleRequest';

export const createArticleRequest = '@createArticleRequest';

const baseUrl = 'https://conduit.productionready.io/api';
export function toggleRoutes(username: string, mockingEnabled: boolean = false, mockData: MockData): void {
  cy.routeAs('GET', `${baseUrl}/profiles/${username}`, getProfileRequest);
  cy.routeAs('GET', `${baseUrl}/articles?**`, getArticlesRequest, mockingEnabled, mockData ? mockData.articles : null);
  cy.routeAs('GET', `${baseUrl}/articles/**`, getArticleRequest, mockingEnabled, mockData ? mockData.article : null);

  cy.routeAs('POST', `${baseUrl}/articles`, createArticleRequest);
}
