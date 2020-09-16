import { MockData } from "./mock-data";

export const getProfileRequest = "@getProfileRequest";
export const getArticlesRequest = "@getArticlesRequest";

export function toggleRoutes(
  username: string,
  mockingEnabled: boolean = false,
  mockData: MockData
): void {
  cy.routeAs(
    "GET",
    `https://conduit.productionready.io/api/profiles/${username}`,
    getProfileRequest
  );

  cy.routeAs(
    "GET",
    `https://conduit.productionready.io/api/articles?author=${username}&limit=10&offset=0`,
    getArticlesRequest,
    mockingEnabled,
    mockData?.articles
  );
}
