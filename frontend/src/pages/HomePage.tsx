import { Loader2 } from "lucide-react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/features/news/components/HeroSection";
import { LatestNewsSection } from "@/features/news/components/LatestNewsSection";
import { TrendingSidebar } from "@/features/news/components/TrendingSidebar";
import { useTopHeadlines } from "@/features/news/hooks/useTopHeadlines";

export function HomePage() {
  const { data, isLoading, isError, error } = useTopHeadlines();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 md:px-6 md:py-10">
        {isLoading && (
          <div className="flex min-h-[40vh] items-center justify-center gap-3 text-muted-foreground">
            <Loader2 className="size-5 animate-spin" />
            <p>Loading news...</p>
          </div>
        )}

        {isError && (
          <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-6 text-destructive">
            <p className="font-medium">Unable to load news</p>
            <p className="mt-1 text-sm">{error.message}</p>
          </div>
        )}

        {!isLoading && !isError && !data?.length && (
          <p className="text-center text-muted-foreground">No articles found.</p>
        )}

        {!isLoading && !isError && data && data.length > 0 && (
          <div className="space-y-10 md:space-y-12">
            <HeroSection article={data[0]} />

            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-8">
                <LatestNewsSection articles={data.slice(1)} />
              </div>
              <div className="lg:col-span-4">
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
