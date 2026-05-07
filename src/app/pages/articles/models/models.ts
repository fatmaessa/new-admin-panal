export interface Article {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}

export interface CreateArticle {
  name: string;
  description: string;
  imageUrl: string;
  link: string;
}
