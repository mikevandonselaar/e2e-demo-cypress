declare namespace Cypress {
  interface Chainable<Subject> {
    readonly getElement: (
      value: string,
      options?: Partial<Loggable & Timeoutable & Withinable & Shadow>
    ) => Chainable<Subject>;

    readonly login: () => Chainable<Subject>;

    readonly routeAs: (
      method: string,
      route: string,
      name: string,
      mockingEnabled?: boolean,
      fixture?: any
    ) => Chainable<any>;
  }
}
