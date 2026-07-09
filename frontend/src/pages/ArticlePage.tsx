import { ArrowLeft, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router";
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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8 md:px-6 md:py-10">
        <Button asChild variant="ghost" className="mb-6 -ml-2">
          <Link to="/">
            <ArrowLeft />
            Back to home
          </Link>
        </Button>

        {!article ? (
          <p className="py-20 text-center text-muted-foreground">Article not available.</p>
        ) : (
          <article>
            <Card className="overflow-hidden rounded-xl border shadow-md">
              <div className="aspect-[16/9] overflow-hidden bg-muted md:aspect-[21/9]">
                {article.imageUrl ? (
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-muted">
                    <span className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                      No image
                    </span>
                  </div>
                )}
              </div>

              <CardContent className="space-y-6 p-6 md:p-8">
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

                <Separator />

                {article.description && (
                  <p className="text-base leading-relaxed text-muted-foreground md:text-lg">
                    {article.description}
                  </p>
                )}

                {article.content && (
                  <p className="text-sm leading-relaxed text-muted-foreground">{article.content}</p>
                )}

                <Button asChild size="lg">
                  <a href={article.url} target="_blank" rel="noopener noreferrer">
                    Read Original Article
                    <ExternalLink />
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
