export function getArticlePath(id: string) {
  return `/article/${encodeURIComponent(id)}`;
}
