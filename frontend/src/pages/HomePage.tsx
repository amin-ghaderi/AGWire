import { useState } from "react";
import { PageEmpty, PageError, PageLoading } from "@/components/common/PageStatus";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/features/news/components/HeroSection";
import { LatestNewsSection } from "@/features/news/components/LatestNewsSection";
import { TrendingSidebar } from "@/features/news/components/TrendingSidebar";
import { useTopHeadlines } from "@/features/news/hooks/useTopHeadlines";
import { SearchBar } from "@/features/search/components/SearchBar";
import { useSearchNews } from "@/features/search/hooks/useSearchNews";

export function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const isSearching = searchQuery.length > 0;

  const headlinesQuery = useTopHeadlines();
  const searchQueryResult = useSearchNews(searchQuery);

  const activeQuery = isSearching ? searchQueryResult : headlinesQuery;
  const { data, isLoading, isError, error } = activeQuery;

  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-background">
      <Header />
      <SearchBar onSearch={setSearchQuery} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">
        {isLoading && (
          <PageLoading message={isSearching ? "Searching..." : "Loading headlines..."} />
        )}

        {isError && (
          <PageError
            title={isSearching ? "Unable to search news" : "Unable to load news"}
            message={error.message}
          />
        )}

        {!isLoading && !isError && !data?.length && (
          <PageEmpty
            message={
              isSearching
                ? `No articles found for "${searchQuery}".`
                : "No articles found."
            }
          />
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="space-y-10 md:space-y-12">
            {isSearching && (
              <p className="text-sm leading-relaxed text-muted-foreground">
                Showing results for{" "}
                <span className="font-medium text-foreground">"{searchQuery}"</span>
              </p>
            )}

            <HeroSection article={data[0]} />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className={`min-w-0 ${isSearching ? "lg:col-span-12" : "lg:col-span-8"}`}>
                <LatestNewsSection articles={data.slice(1)} />
              </div>
              {!isSearching && (
                <div className="min-w-0 lg:col-span-4">
                  <TrendingSidebar articles={data} />
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
