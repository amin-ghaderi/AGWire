import type { Article } from "@/shared/types";

type LatestNewsSectionProps = {
  articles: Article[];
};

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Latest News</h2>
      <div className="space-y-6">
        {articles.map((article) => (
          <article key={article.id} className="space-y-1 border-b pb-4 last:border-b-0">
            <h3 className="text-lg font-medium">{article.title}</h3>
            <p className="text-sm text-muted-foreground">{article.sourceName}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(article.publishedAt).toLocaleString()}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
