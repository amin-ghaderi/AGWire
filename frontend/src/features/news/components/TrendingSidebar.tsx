import { TrendingUp } from "lucide-react";
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
    <aside className="lg:sticky lg:top-8">
      <Card className="border shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 text-base font-bold uppercase tracking-wide">
            <TrendingUp className="size-4" />
            Trending
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-0 pb-6 pt-0">
          <ol className="space-y-0">
            {trendingArticles.map((article, index) => (
              <li key={article.id}>
                <a
                  href={article.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex gap-4 rounded-lg px-2 py-3 transition-colors hover:bg-muted/50"
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                    {index + 1}
                  </span>
                  <div className="min-w-0 space-y-1">
                    <p className="line-clamp-2 text-sm font-medium leading-snug group-hover:text-primary">
                      {article.title}
                    </p>
                    <p className="text-xs text-muted-foreground">{article.sourceName}</p>
                  </div>
                </a>
                {index < trendingArticles.length - 1 && <Separator />}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </aside>
  );
}
