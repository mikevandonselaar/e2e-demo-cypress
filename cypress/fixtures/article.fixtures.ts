import { ArticleInput } from '../../src/app/article/article.model';

export const defaultArticle: ArticleInput = {
  title: 'Cypress.io + OneLogin: using API to authenticate before testing',
  body: `Cypress is one of hottest NodeJS based automated testing framework at the moment, and its founder, Brian Mann, spares no words talking about how you should never use your login page to authenticate a user before testing.
    If your application uses OneLogin, however, that’s easier said then done. As far as Oauth solutions go, OneLogin is one of the (unnecessarily) hardest ones you could ask to tackle during automated testing. This is exactly what I had to do and, after many days of try and error, I finally did it.
    Plus, I was very frustrated for not finding any detailed documentation specific for this subject. There are plenty of examples even within Cypress itself for how to handle social login and other generic Oauth solutions, but I wanted something tailored-made for OneLogin. So here I am writing my own on a Sunday afternoon. Hopefully this will help you also.
    Goal
    What we are trying to achieve here is simple: using http requests to communicate with OneLogin and with your own target app to bypass the login page completely and start interacting with the UI after that.
    We also want to encapsulate the login process so it can be called easily during a test inside a before hook.
    Macro steps
    Overall, what you need to do during the login process itself is:
    Generate a OneLogin token using a clientId and clientSecrect (More on those two latter on)
    Generate a user login token using the token from before, plus user name and password.
    Call your app to generate an authenticated session using the user login token from previous step. After this, you can use cy.visit() into any of your app’s page and you’ll be logged in.
    Those three steps are explained in three different functions bellow.
    Cypress comes with an http request solution built-in with the method cy.request(), so you can make all of your GETs, POSTs out-of-the-box. It also handles redirects and cookies gracefully, which comes very handy in this case.
    Note: if your app has two factor authentication enabled, it is better to have a specific user that can login without 2FA for you to use during tests. In my opinion, things are already hard enough as is, so don’t even start without having that sorted.`,
  description:
    'What we are trying to achieve here is simple: using http requests to communicate with OneLogin and with your own target app to bypass the login page completely and start interacting with the UI after that.',
  tagList: ['Cypress', 'E2E Testing', 'Frontend'],
};
