declare namespace Cypress {
  interface Chainable<Subject> {
    readonly getElement: (
      value: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
    ) => Chainable<Subject>;
    readonly routeAs: (
      method: string,
      route: string,
      name: string,
      mockingEnabled?: boolean,
      fixture?: any
    ) => Chainable<any>;
    readonly invokeValue: (selector: string, text: string) => Chainable<any>;

    readonly resetState: (user: any) => Chainable<Subject>;
    readonly login: (user?: any) => Chainable<Subject>;
    readonly markArticleAsFavorite: (article: any, favorite: boolean) => Chainable<Subject>;
  }
}
