import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Article } from "@/shared/types";

type HeroSectionProps = {
  article: Article;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section>
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="relative aspect-[21/9] overflow-hidden bg-muted">
          {article.imageUrl ? (
            <img
              src={article.imageUrl}
              alt={article.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-muted to-muted-foreground/10">
              <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Featured Story
              </span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        </div>

        <CardContent className="space-y-4 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <span className="font-semibold uppercase tracking-wide text-foreground">
              {article.sourceName}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
            {article.title}
          </h1>

          {article.description && (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {article.description}
            </p>
          )}

          <Button asChild size="lg" className="mt-2">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read article
              <ExternalLink className="ml-1" />
            </a>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
