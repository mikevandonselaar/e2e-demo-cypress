// ***********************************************
// This file is used to create various custom commands and overwrite existing commands.
// For comprehensive examples of custom commands please read more here: https://on.cypress.io/custom-commands
// ***********************************************
Cypress.Commands.add('login', (user?) => {
  cy.request({
    method: 'POST',
    url: 'https://conduit.productionready.io/api/users/login',
    headers: {
      Authorization: Cypress.env('AUTH_HEADER_AUTHORIZATION'),
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: {
      user: {
        email: Cypress.env(`AUTH_USERNAME`),
        password: Cypress.env(`AUTH_PASSWORD`),
      },
    },
  }).then((response) => {
    const token = response.body.user.token;
    Cypress.Cookies.preserveOnce('jwtToken', `${token}`);
    window.localStorage.setItem('jwtToken', `${token}`);

    console.log(response);
  });
});

Cypress.Commands.add(
  'routeAs',
  (method: string, url: string, name: string, mockingEnabled: boolean = false, fixture: any = {}) =>
    mockingEnabled
      ? cy.route(method, url, fixture).as(name.replace('@', ''))
      : cy.route(method, url).as(name.replace('@', ''))
);

Cypress.Commands.add(
  'getElement',
  (
    element: string,
    options?: Partial<Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow> | undefined
  ) => cy.get(`[data-cy="${element}"]`, options)
);
