import type { Article } from "@/shared/types";

type TrendingSidebarProps = {
  articles: Article[];
};

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  const trendingArticles = articles.slice(0, 5);

  return (
    <aside className="space-y-4">
      <h2 className="text-xl font-semibold">Trending</h2>
      <ol className="space-y-3">
        {trendingArticles.map((article, index) => (
          <li key={article.id} className="flex gap-3">
            <span className="text-sm font-medium text-muted-foreground">{index + 1}</span>
            <p className="text-sm font-medium leading-snug">{article.title}</p>
          </li>
        ))}
      </ol>
    </aside>
  );
}
