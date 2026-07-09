export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <div className="flex items-baseline gap-2">
          <p className="text-2xl font-black tracking-tighter">AGWire</p>
          <span className="hidden text-xs font-medium uppercase tracking-widest text-muted-foreground sm:inline">
            News
          </span>
        </div>
        <p className="text-xs text-muted-foreground">Top headlines · Live</p>
      </div>
    </header>
  );
}
