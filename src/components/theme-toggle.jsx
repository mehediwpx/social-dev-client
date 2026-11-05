"use client";

import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Light/dark switch. The `.dark` class on <html> drives Tailwind's dark
 * variants (see `@custom-variant dark` in globals.css), and the pref-paint
 * <script> in app/layout.js applies the stored choice before hydration.
 * After mounting, this component keeps that class and `localStorage.theme`
 * in sync.
 */
export default function ThemeToggle() {
  // null = not mounted yet (class on <html> already reflects the real theme)
  const [theme, setTheme] = useState(null);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    localStorage.setItem("theme", next);
    setTheme(next);
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
      title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-full"
    >
      {/* Render both icons and let CSS pick, so there is no flash on mount */}
      <Sun className="hidden size-4 dark:inline" />
      <Moon className="inline size-4 dark:hidden" />
    </Button>
  );
}
