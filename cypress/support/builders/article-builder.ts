import axios from 'axios';

import { Article, ArticleInput, ArticleWrapper } from '../../../src/app/article/article.model';

import { getAuthHeadersFromLocalStorage } from './test-data-manager';
import { EntityBuilder } from './entity-builder';
import { defaultArticle } from '../../fixtures/article.fixtures';

export class ArticleBuilder extends EntityBuilder<ArticleWrapper, ArticleInput> {
  markAsFavorite = false;

  constructor(mockingEnabled: boolean = false) {
    super('ARTICLE_', defaultArticle, true);
  }

  withTitle(title: string): ArticleBuilder {
    this._entityToCreate = { ...this._entityToCreate, title };

    return this;
  }

  withTags(tagList: string[]): ArticleBuilder {
    this._entityToCreate = { ...this._entityToCreate, tagList };

    return this;
  }

  asFavorite(): ArticleBuilder {
    this.markAsFavorite = true;

    return this;
  }

  async buildWithRealData(): Promise<any> {
    const generator = axios.create({
      baseURL: 'https://conduit.productionready.io/api/',
      headers: getAuthHeadersFromLocalStorage(),
    });

    let article = (await generator.post<ArticleWrapper>(`/articles`, this._entityToCreate)).data;
    if (this.markAsFavorite) {
      article = (await generator.post(`/articles/${article.article.slug}/favorite`)).data;
    }

    return article;
  }
}
