import { useTopHeadlines } from "@/features/news/hooks/useTopHeadlines";

export function HomePage() {
  const { data, isLoading, isError, error } = useTopHeadlines();

  if (isLoading) {
    return <p>Loading news...</p>;
  }

  if (isError) {
    return <p>Error loading news: {error.message}</p>;
  }

  if (!data?.length) {
    return <p>No articles found.</p>;
  }

  return (
    <div className="space-y-6">
      {data.map((article) => (
        <article key={article.id} className="space-y-1">
          <h2 className="text-lg font-medium">{article.title}</h2>
          <p>{article.sourceName}</p>
          <p>{new Date(article.publishedAt).toLocaleString()}</p>
        </article>
      ))}
    </div>
  );
}
