import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-muted/30">
      <div className="mx-auto max-w-7xl space-y-4 px-4 py-8 md:px-6">
        <Separator />
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold tracking-tight">AGWire</p>
          <p className="text-sm text-muted-foreground">
            Modern news aggregation · Built with React & ASP.NET Core
          </p>
        </div>
      </div>
    </footer>
  );
}
