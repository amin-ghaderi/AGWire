import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router";
import { ArticleImage } from "@/components/common/ArticleImage";
import { PageEmpty } from "@/components/common/PageStatus";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatArticleDate } from "@/shared/lib/format";
import type { ArticleLocationState } from "@/shared/types/router";

export function ArticlePage() {
  const location = useLocation();
  const state = location.state as ArticleLocationState | null;
  const article = state?.article;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />

      <main className="mx-auto w-full max-w-3xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <Button asChild variant="ghost" className="mb-8 -ml-2 h-10 px-3">
          <Link to="/">
            <ArrowLeft aria-hidden="true" />
            Back to home
          </Link>
        </Button>

        {!article ? (
          <PageEmpty message="Article not available." />
        ) : (
          <article>
            <Card className="overflow-hidden rounded-xl border shadow-sm">
              <div className="aspect-[16/9] overflow-hidden bg-muted md:aspect-[21/9]">
                <ArticleImage src={article.imageUrl} alt={article.title} />
              </div>

              <CardContent className="space-y-6 p-6 md:p-8">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{article.sourceName}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.publishedAt}>
                    {formatArticleDate(article.publishedAt, "long")}
                  </time>
                </div>

                <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-4xl lg:text-5xl">
                  {article.title}
                </h1>

                <Separator />

                {article.description && (
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {article.description}
                  </p>
                )}

                {article.content && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{article.content}</p>
                )}

                <Button asChild size="lg" className="mt-2">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Original Article
                    <ExternalLink aria-hidden="true" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
