import axios from "axios";

import {
  Article,
  ArticleInput,
  ArticleWrapper,
} from "../../../src/app/article/article.model";

import { getAuthHeadersFromLocalStorage } from "./test-data-manager";
import { EntityBuilder } from "./entity-builder";
import { defaultArticle } from "../../fixtures/article.fixtures";

export class ArticleBuilder extends EntityBuilder<
  ArticleWrapper,
  ArticleInput
> {
  constructor() {
    super("ARTICLE_", defaultArticle, true);
  }

  withTitle(title: string): ArticleBuilder {
    this._entityToCreate = { ...this._entityToCreate, title };

    return this;
  }

  withTags(tagList: string[]): ArticleBuilder {
    this._entityToCreate = { ...this._entityToCreate, tagList };

    return this;
  }

  async buildWithRealData(): Promise<any> {
    const generator = axios.create({
      baseURL: "https://conduit.productionready.io/api/",
      headers: getAuthHeadersFromLocalStorage(),
    });

    return (await generator.post<Article>(`/articles`, this._entityToCreate))
      .data;
  }
}
