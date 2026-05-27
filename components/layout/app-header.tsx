"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const nav = [
  { href: "/upload", label: "Upload" },
  { href: "/job-descriptions", label: "Job descriptions" },
  { href: "/candidates", label: "Candidates" },
];

export function AppHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-stone/15 bg-cream/80 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link href="/upload" className="font-serif text-xl text-charcoal">
          SDR Screener
        </Link>
        <nav className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                pathname === item.href || pathname.startsWith(item.href + "/")
                  ? "bg-dried-grass/50 text-charcoal"
                  : "text-stone hover:bg-sand hover:text-charcoal"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
