import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getArticlePath } from "@/shared/lib/routes";
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
    <aside aria-label="Trending headlines" className="lg:sticky lg:top-8 lg:self-start">
      <Card className="rounded-xl border shadow-sm">
        <CardHeader className="space-y-1 px-5 pb-4 pt-5">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Trending
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 pb-5 pt-0">
          <ol className="space-y-0">
            {trendingArticles.map((article, index) => (
              <li key={article.id}>
                <Link
                  to={getArticlePath(article.id)}
                  state={{ article }}
                  className="flex items-start gap-3 rounded-lg px-2 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:bg-muted/50"
                  aria-label={`Trending ${index + 1}: ${article.title}`}
                >
                  <span
                    className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-bold tabular-nums text-foreground"
                    aria-hidden="true"
                  >
                    {index + 1}
                  </span>
                  <div className="min-w-0 flex-1 space-y-1">
                    <p className="line-clamp-2 text-sm font-medium leading-snug">{article.title}</p>
                    <p className="truncate text-xs text-muted-foreground">{article.sourceName}</p>
                  </div>
                </Link>
                {index < trendingArticles.length - 1 && <Separator className="mx-2" />}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </aside>
  );
}
