import type { Article } from "@/shared/types";

type HeroSectionProps = {
  article: Article;
};

export function HeroSection({ article }: HeroSectionProps) {
  return (
    <section className="space-y-3 border-b pb-8">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="aspect-[16/9] w-full object-cover"
        />
      )}
      <div className="space-y-2">
        <p className="text-sm text-muted-foreground">{article.sourceName}</p>
        <h1 className="text-3xl font-bold leading-tight">{article.title}</h1>
        {article.description && (
          <p className="text-muted-foreground">{article.description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          {new Date(article.publishedAt).toLocaleString()}
        </p>
      </div>
    </section>
  );
}
