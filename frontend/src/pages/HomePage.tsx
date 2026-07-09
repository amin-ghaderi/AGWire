import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/features/news/components/HeroSection";
import { LatestNewsSection } from "@/features/news/components/LatestNewsSection";
import { TrendingSidebar } from "@/features/news/components/TrendingSidebar";
import { useTopHeadlines } from "@/features/news/hooks/useTopHeadlines";

export function HomePage() {
  const { data, isLoading, isError, error } = useTopHeadlines();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
        {isLoading && <p>Loading news...</p>}

        {isError && <p>Error loading news: {error.message}</p>}

        {!isLoading && !isError && !data?.length && <p>No articles found.</p>}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="space-y-8">
            <HeroSection article={data[0]} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2">
                <LatestNewsSection articles={data} />
              </div>
              <div>
                <TrendingSidebar articles={data} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
