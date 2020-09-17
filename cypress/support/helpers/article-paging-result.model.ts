import { Article } from '../../../src/app/article/article.model';

export interface ArticlePagingResult {
  articles: Article[];
  articlesCount: number;
}
