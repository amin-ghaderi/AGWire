import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatArticleDate } from "@/shared/lib/format";
import type { Article } from "@/shared/types";

type HeroSectionProps = {
  article: Article;
};

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section aria-label="Featured story">
      <Card className="overflow-hidden rounded-xl border shadow-md">
        <div className="relative aspect-[16/9] overflow-hidden bg-muted md:aspect-[21/9]">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-muted">
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Featured Story
              </span>
            </div>
          )}
        </div>

        <CardContent className="space-y-5 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{article.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt, "long")}
            </time>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {article.description && (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {article.description}
            </p>
          )}

          <Button asChild size="lg">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read Article
              <ExternalLink />
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
