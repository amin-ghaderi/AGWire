import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-5 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-3xl font-black tracking-tighter md:text-4xl">AGWire</p>
            <p className="mt-1 text-sm text-muted-foreground">Top headlines from trusted sources</p>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Live · Updated continuously
          </p>
        </div>
        <Separator className="mt-5" />
      </div>
    </header>
  );
}
