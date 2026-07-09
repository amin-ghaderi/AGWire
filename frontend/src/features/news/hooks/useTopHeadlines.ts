import { useQuery } from "@tanstack/react-query";
import { getTopHeadlines } from "@/features/news/api/getTopHeadlines";

export function useTopHeadlines() {
  return useQuery({
    queryKey: ["news", "top-headlines"],
    queryFn: getTopHeadlines,
  });
}
