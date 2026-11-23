import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * Notes live as Markdown files in content/notes/. The file name is the URL:
 * content/notes/my-note.md -> /notes/my-note.
 * Files starting with "_" (like _template.md) and notes with `draft: true` are skipped.
 */

const NOTES_DIR = path.join(process.cwd(), "content", "notes");

export const statuses = {
  seedling: { emoji: "🌱", label: "Seedling", hint: "A rough idea" },
  budding: { emoji: "🌿", label: "Budding", hint: "Taking shape" },
  evergreen: { emoji: "🌳", label: "Evergreen", hint: "Settled thinking" },
} as const;

export type NoteStatus = keyof typeof statuses;

export { themes } from "@/lib/themes";

export type NoteMeta = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  status: NoteStatus;
  tags: string[];
  summary: string;
};

export type Note = NoteMeta & { html: string };

function toISODate(value: unknown, field: string, file: string): string {
  // YAML turns unquoted dates into Date objects; accept both forms.
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) {
    throw new Error(`${file}: "${field}" must be a date like 2026-01-31`);
  }
  return d.toISOString().slice(0, 10);
}

function readNote(file: string): Note | null {
  const raw = fs.readFileSync(path.join(NOTES_DIR, file), "utf8");
  const { data, content } = matter(raw);
  if (data.draft === true) return null;

  if (!data.title) throw new Error(`${file}: missing "title"`);
  if (!(data.status in statuses)) {
    throw new Error(
      `${file}: "status" must be one of ${Object.keys(statuses).join(", ")}`,
    );
  }

  return {
    slug: file.replace(/\.md$/, ""),
    title: String(data.title),
    date: toISODate(data.date, "date", file),
    updated: data.updated ? toISODate(data.updated, "updated", file) : undefined,
    status: data.status as NoteStatus,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    summary: data.summary ? String(data.summary) : "",
    html: marked.parse(content, { async: false }),
  };
}

/** All published notes, newest (by last update) first. */
export function getAllNotes(): Note[] {
  if (!fs.existsSync(NOTES_DIR)) return [];
  return fs
    .readdirSync(NOTES_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"))
    .map(readNote)
    .filter((n): n is Note => n !== null)
    .sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date));
}

export function getNote(slug: string): Note | undefined {
  return getAllNotes().find((n) => n.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
