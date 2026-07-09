import { apiClient } from "@/shared/api/client";
import type { Article } from "@/shared/types";

export async function getTopHeadlines(): Promise<Article[]> {
  const response = await apiClient.get<Article[]>("/api/news");
  return response.data;
}
