import { Loader2 } from "lucide-react";
import { useState } from "react";
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
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <SearchBar onSearch={setSearchQuery} />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">
        {isLoading && (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="size-6 animate-spin" />
            <p className="text-sm">{isSearching ? "Searching..." : "Loading headlines..."}</p>
          </div>
        )}

        {isError && (
          <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
            <p className="font-semibold text-destructive">
              {isSearching ? "Unable to search news" : "Unable to load news"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
          </div>
        )}

        {!isLoading && !isError && !data?.length && (
          <p className="py-20 text-center text-muted-foreground">
            {isSearching
              ? `No articles found for "${searchQuery}".`
              : "No articles found."}
          </p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="space-y-10 md:space-y-14">
            {isSearching && (
              <p className="text-sm text-muted-foreground">
                Showing results for <span className="font-medium text-foreground">"{searchQuery}"</span>
              </p>
            )}

            <HeroSection article={data[0]} />

            <div className="flex flex-col gap-10 lg:grid lg:grid-cols-12 lg:gap-10">
              <div className={isSearching ? "lg:col-span-12" : "lg:col-span-8"}>
                <LatestNewsSection articles={data.slice(1)} />
              </div>
              {!isSearching && (
                <div className="lg:col-span-4">
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
