import { Link } from "react-router";
import { Separator } from "@/components/ui/separator";

export function Header() {
  return (
    <header className="border-b bg-background">
      <div className="mx-auto max-w-7xl px-4 py-6 md:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <Link
              to="/"
              className="inline-block rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <h1 className="text-3xl font-black tracking-tighter md:text-4xl">AGWire</h1>
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Top headlines from trusted sources
            </p>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Live · Updated continuously
          </p>
        </div>
        <Separator className="mt-6" />
      </div>
    </header>
  );
}
