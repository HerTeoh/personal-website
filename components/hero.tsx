export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-between px-6 md:px-16 lg:px-24 py-12 bg-background">
      {/* Top nav bar */}
      <header className="flex items-center justify-between">
        <span className="font-sans text-sm text-muted-foreground tracking-widest uppercase">
          HerTeoh.com
        </span>
        <nav aria-label="Primary navigation">
          <ul className="flex gap-8">
            {["About", "Contact"].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  className="font-sans text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 tracking-wide"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Main hero content */}
      <main className="flex-1 flex flex-col justify-center py-20">
        <div className="max-w-4xl">
          {/* Location pill */}
          <div className="inline-flex items-center gap-2 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" aria-hidden="true" />
            <span className="font-sans text-xs text-muted-foreground tracking-widest uppercase">
              Singapore
            </span>
          </div>

          {/* Name */}
          <h1 className="font-serif text-[clamp(3.5rem,12vw,9rem)] leading-none font-normal text-foreground text-balance">
            Her Teoh
          </h1>

          {/* Role */}
          <p className="font-serif italic text-[clamp(1.1rem,3vw,2rem)] text-muted-foreground mt-4 mb-10">
            Assistant Portfolio Manager
          </p>

          {/* Divider */}
          <div className="w-16 h-px bg-accent mb-10" aria-hidden="true" />

          {/* One-liner */}
          <p className="font-sans text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg text-pretty">
            Data. Operations. Entrepreneurship. Now markets.
          </p>
        </div>
      </main>

      {/* Bottom scroll hint */}
      <footer className="flex items-center justify-end">
        <div className="flex items-center gap-2 text-muted-foreground">
          <span className="font-sans text-xs tracking-widest uppercase">Scroll</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
            className="mt-0.5"
          >
            <path
              d="M8 3v10M4 9l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </footer>
    </section>
  );
}
