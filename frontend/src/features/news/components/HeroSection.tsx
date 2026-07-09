import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatArticleDate } from "@/shared/lib/format";
import { getArticlePath } from "@/shared/lib/routes";
import type { Article } from "@/shared/types";

type HeroSectionProps = {
  article: Article;
};

export function HeroSection({ article }: HeroSectionProps) {
  const articlePath = getArticlePath(article.id);

  return (
    <section aria-label="Featured story">
      <Card className="overflow-hidden rounded-xl border shadow-md">
        <Link to={articlePath} state={{ article }} className="block">
          <div className="relative aspect-[16/9] overflow-hidden bg-muted md:aspect-[21/9]">
            {article.imageUrl ? (
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-muted">
                <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                  Featured Story
                </span>
              </div>
            )}
          </div>
        </Link>

        <CardContent className="space-y-5 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{article.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt, "long")}
            </time>
          </div>

          <Link to={articlePath} state={{ article }} className="block hover:opacity-90">
            <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
              {article.title}
            </h1>
          </Link>

          {article.description && (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {article.description}
            </p>
          )}

          <Button asChild size="lg">
            <Link to={articlePath} state={{ article }}>
              Read Article
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
