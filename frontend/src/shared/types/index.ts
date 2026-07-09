export interface Article {
  id: string;
  title: string;
  description?: string | null;
  content?: string | null;
  imageUrl?: string | null;
  publishedAt: string;
  sourceName: string;
  url: string;
  category?: string | null;
}
