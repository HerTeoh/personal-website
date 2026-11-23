"use client";

/** Row of "All / theme" toggle chips. Hidden when there's only one theme to pick. */
export default function ThemeFilter({
  tags,
  active,
  onChange,
}: {
  tags: string[];
  active: string | null;
  onChange: (tag: string | null) => void;
}) {
  if (tags.length < 2) return null;

  const chip = (label: string, value: string | null) => {
    const on = active === value;
    return (
      <button
        key={label}
        type="button"
        onClick={() => onChange(value)}
        aria-pressed={on}
        className={`px-4 py-2 rounded-full border font-sans text-xs transition-colors duration-200 ${
          on
            ? "bg-foreground text-background border-foreground"
            : "border-border text-muted-foreground hover:border-accent hover:text-foreground"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div role="group" aria-label="Filter by theme" className="flex flex-wrap gap-3 mb-12">
      {chip("All", null)}
      {tags.map((t) => chip(t, t))}
    </div>
  );
}
