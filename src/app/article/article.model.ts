export interface ArticleWrapper {
  article: Article;
}

export interface Article {
  author: string;
  body: string;
  createdAt: string;
  description: string;
  favorited: false;
  favoritesCount: number;
  slug: string;
  tagList: string[];
  title: string;
  updatedAt: string;
}

export interface ArticleInput {
  title: string;
  description: string;
  body: string;
  tagList: string[];
}
