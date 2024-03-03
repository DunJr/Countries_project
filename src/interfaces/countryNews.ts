export interface CountryNews {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface Article {
  key: number | null;
  source: {
    id: string | null;
    name: string | null;
  };
  author: string | null;
  title: string | null;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string | null;
  content: string | null;
}
