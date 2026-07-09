import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
        <Separator className="mb-6" />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-tight">AGWire</p>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            Modern news aggregation · Built with React & ASP.NET Core
          </p>
        </div>
      </div>
    </footer>
  );
}
