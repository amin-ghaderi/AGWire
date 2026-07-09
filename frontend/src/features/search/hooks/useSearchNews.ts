import { useQuery } from "@tanstack/react-query";
import { searchNews } from "@/features/search/api/searchNews";

export function useSearchNews(query: string) {
  const trimmedQuery = query.trim();

  return useQuery({
    queryKey: ["news", "search", trimmedQuery],
    queryFn: () => searchNews(trimmedQuery),
    enabled: trimmedQuery.length > 0,
  });
}
