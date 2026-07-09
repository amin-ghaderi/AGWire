import { apiClient } from "@/shared/api/client";
import type { Article } from "@/shared/types";

export async function searchNews(query: string): Promise<Article[]> {
  const response = await apiClient.get<Article[]>("/api/news/search", {
    params: { q: query },
  });
  return response.data;
}
