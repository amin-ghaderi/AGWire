import { ImageOff } from "lucide-react";
import { cn } from "@/shared/lib/utils";

type ArticleImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  fallbackLabel?: string;
};

export function ArticleImage({
  src,
  alt,
  className,
  fallbackLabel = "Image unavailable",
}: ArticleImageProps) {
  if (!src) {
    return (
      <div
        className={cn(
          "flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground",
          className,
        )}
        role="img"
        aria-label={fallbackLabel}
      >
        <ImageOff className="size-6" aria-hidden="true" />
        <span className="text-xs font-medium uppercase tracking-wider">{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("h-full w-full object-cover", className)}
    />
  );
}
