import { Link } from "react-router";
import { ArticleImage } from "@/components/common/ArticleImage";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatArticleDate } from "@/shared/lib/format";
import { getArticlePath } from "@/shared/lib/routes";
import type { Article } from "@/shared/types";

type LatestNewsSectionProps = {
  articles: Article[];
};

function NewsCard({ article }: { article: Article }) {
  const articlePath = getArticlePath(article.id);

  return (
    <Link
      to={articlePath}
      state={{ article }}
      className="block h-full rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`Read article: ${article.title}`}
    >
      <Card className="flex h-full flex-col overflow-hidden rounded-xl border shadow-sm hover:shadow-md">
        <div className="aspect-[16/10] shrink-0 overflow-hidden bg-muted">
          <ArticleImage src={article.imageUrl} alt={article.title} />
        </div>

        <CardContent className="flex flex-1 flex-col space-y-3 p-5">
          <h3 className="line-clamp-2 text-lg font-semibold leading-snug tracking-tight">
            {article.title}
          </h3>

          {article.description && (
            <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
              {article.description}
            </p>
          )}

          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 pt-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{article.sourceName}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.publishedAt}>
              {formatArticleDate(article.publishedAt)}
            </time>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function LatestNewsSection({ articles }: LatestNewsSectionProps) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <section aria-label="Latest news" className="space-y-6">
      <div className="space-y-3">
        <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Latest News</h2>
        <Separator />
      </div>

      <ul className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <li key={article.id} className="min-w-0">
            <NewsCard article={article} />
          </li>
        ))}
      </ul>
    </section>
  );
}
