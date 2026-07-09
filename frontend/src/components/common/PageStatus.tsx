import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

type PageLoadingProps = {
  message: string;
};

export function PageLoading({ message }: PageLoadingProps) {
  return (
    <div
      className="flex min-h-[40vh] flex-col items-center justify-center gap-4 py-16"
      role="status"
      aria-live="polite"
    >
      <Loader2 className="size-8 text-muted-foreground" aria-hidden="true" />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
}

type PageErrorProps = {
  title: string;
  message: string;
};

export function PageError({ title, message }: PageErrorProps) {
  return (
    <Card className="border-destructive/20 bg-destructive/5 shadow-sm" role="alert">
      <CardContent className="space-y-2 p-6">
        <p className="font-semibold text-destructive">{title}</p>
        <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}

type PageEmptyProps = {
  message: string;
};

export function PageEmpty({ message }: PageEmptyProps) {
  return (
    <Card className="border-dashed shadow-none">
      <CardContent className="py-16 text-center">
        <p className="text-sm leading-relaxed text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  );
}
