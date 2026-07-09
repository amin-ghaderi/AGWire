import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Article } from "@/shared/types";

type LatestNewsSectionProps = {
  articles: Article[];
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function NewsCard({ article }: { article: Article }) {
  return (
    <Card className="group overflow-hidden border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="aspect-[16/10] overflow-hidden bg-muted">
        {article.imageUrl ? (
          <img
            src={article.imageUrl}
            alt={article.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
            <span className="text-xs uppercase tracking-widest text-muted-foreground">No image</span>
          </div>
        )}
      </div>

      <CardContent className="space-y-3 p-5">
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          <span>{article.sourceName}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
        </div>

        <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
          {article.title}
        </h3>

        {article.description && (
          <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
            {article.description}
          </p>
        )}
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button asChild variant="outline" size="sm" className="w-full">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
            <ArrowUpRight />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl font-bold tracking-tight">Latest News</h2>
        <Separator className="flex-1" />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {articles.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
