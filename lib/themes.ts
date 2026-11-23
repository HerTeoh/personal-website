/** Themes shared by /notes and /reading. Shown first, in this order, in the filters. */
export const themes = ["ASEAN markets", "Operations", "Building", "Data"];

/** Known themes first (in the order above), then any other tags alphabetically. */
export function orderTags(used: Iterable<string>): string[] {
  const set = new Set(used);
  return [
    ...themes.filter((t) => set.has(t)),
    ...[...set].filter((t) => !themes.includes(t)).sort(),
  ];
}
