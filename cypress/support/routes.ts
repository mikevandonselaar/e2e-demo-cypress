import { ArticlePagingResult } from './helpers/article-paging-result.model';

export const getProfileRequest = '@getProfileRequest';
export const getArticlesRequest = '@getArticlesRequest';
export const getArticleRequest = '@getArticleRequest';

export const createArticleRequest = '@createArticleRequest';

const baseUrl = 'https://conduit.productionready.io/api';
export function toggleRoutes(username: string, mockingEnabled: boolean = false, mockData: ArticlePagingResult): void {
  console.log('mockdata', mockData);
  cy.routeAs('GET', `${baseUrl}/profiles/${username}`, getProfileRequest);
  cy.routeAs('GET', `${baseUrl}/articles?**`, getArticlesRequest, mockingEnabled, mockData ? mockData : null);
  cy.routeAs(
    'GET',
    `${baseUrl}/articles/**`,
    getArticleRequest,
    mockingEnabled,
    mockData ? mockData.articles.filter((d) => d.favorited) : null
  );

  cy.routeAs('POST', `${baseUrl}/articles`, createArticleRequest);
}
