import { Link } from "react-router";
import { ArticleImage } from "@/components/common/ArticleImage";
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
      <Card className="overflow-hidden rounded-xl border shadow-sm">
        <Link
          to={articlePath}
          state={{ article }}
          className="block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label={`Read featured article: ${article.title}`}
        >
          <div className="aspect-[16/9] overflow-hidden bg-muted md:aspect-[21/9]">
            <ArticleImage
              src={article.imageUrl}
              alt={article.title}
              fallbackLabel="Featured story"
            />
          </div>
        </Link>

        <CardContent className="space-y-5 p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{article.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt, "long")}
            </time>
          </div>

          <Link
            to={articlePath}
            state={{ article }}
            className="block max-w-4xl rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <h2 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-[2.75rem] lg:leading-tight">
              {article.title}
            </h2>
          </Link>

          {article.description && (
            <p className="max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {article.description}
            </p>
          )}

          <Button asChild size="lg" className="mt-1">
            <Link to={articlePath} state={{ article }}>
              Read Article
            </Link>
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
