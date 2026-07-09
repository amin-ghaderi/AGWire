import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/shared/types";

type TrendingSidebarProps = {
  articles: Article[];
};

export function TrendingSidebar({ articles }: TrendingSidebarProps) {
  const trendingArticles = articles.slice(0, 5);

  if (trendingArticles.length === 0) {
    return null;
  }

  return (
    <aside aria-label="Trending headlines" className="lg:sticky lg:top-24">
      <Card className="rounded-xl border shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
            Trending
          </CardTitle>
        </CardHeader>

        <CardContent className="pb-6 pt-0">
          <ol className="space-y-0">
            {trendingArticles.map((article, index) => (
              <li key={article.id}>
                <div className="flex gap-4 py-3">
                  <span className="w-6 shrink-0 text-lg font-bold tabular-nums text-muted-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <p className="line-clamp-2 text-sm font-medium leading-snug">{article.title}</p>
                    <p className="text-xs text-muted-foreground">{article.sourceName}</p>
                  </div>
                </div>
                {index < trendingArticles.length - 1 && <Separator />}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </aside>
  );
}
