import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatArticleDate } from "@/shared/lib/format";
import type { Article } from "@/shared/types";

type LatestNewsSectionProps = {
  articles: Article[];
};

function NewsCard({ article }: { article: Article }) {
  return (
    <Card className="group h-full overflow-hidden rounded-xl border shadow-sm transition-shadow duration-300 hover:shadow-md">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-muted">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
          {article.title}
        </h3>

        {article.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.description}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-muted-foreground">
          <span className="font-medium text-foreground">{article.sourceName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>
            {formatArticleDate(article.publishedAt)}
          </time>
        </div>
      </CardContent>
    </Card>
  );
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-label="Latest news" className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Latest News</h2>
        <Separator />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
