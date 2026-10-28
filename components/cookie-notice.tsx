"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "cookie-notice-dismissed";

export default function CookieNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      setVisible(localStorage.getItem(STORAGE_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie notice"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-lg sm:flex sm:items-center sm:gap-6"
    >
      <p className="font-sans text-sm leading-relaxed text-muted-foreground">
        This site doesn&apos;t use cookies. It counts anonymous page views
        without tracking you.{" "}
        <a
          href="/privacy"
          className="text-foreground underline underline-offset-2 hover:text-accent-strong"
        >
          Privacy policy
        </a>
      </p>
      <button
        type="button"
        onClick={dismiss}
        className="mt-4 sm:mt-0 shrink-0 rounded-full bg-foreground px-5 py-2.5 font-sans text-sm text-background hover:bg-accent-strong transition-colors duration-200"
      >
        Got it
      </button>
    </div>
  );
}
