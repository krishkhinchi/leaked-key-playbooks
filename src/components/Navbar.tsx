"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Shield, Menu, X, Search, GitBranch, ChevronRight } from "lucide-react";
import { searchPlaybooks } from "@/lib/playbooks";
import type { Playbook } from "@/lib/types";
import clsx from "clsx";

const NAV_LINKS = [
  { href: "/playbooks",      label: "Playbooks" },
  { href: "/providers",      label: "Providers" },
  { href: "/response-guide", label: "Response Guide" },
  { href: "/about",          label: "About" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Playbook[]>([]);
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { if (searchOpen) inputRef.current?.focus(); }, [searchOpen]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.key === "/" || (e.ctrlKey && e.key === "k")) && !searchOpen) { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") { setSearchOpen(false); setQuery(""); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [searchOpen]);

  useEffect(() => {
    if (query.trim().length > 1) setResults(searchPlaybooks(query).slice(0, 6));
    else setResults([]);
  }, [query]);

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [pathname]);

  return (
    <>
      <header className={clsx(
        "fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200",
        scrolled ? "shadow-[0_1px_3px_rgba(0,0,0,0.08),0_1px_2px_rgba(0,0,0,0.04)]" : "border-b border-[#E5E7EB]"
      )}>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between" aria-label="Main navigation">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group" aria-label="Leaked Key Playbooks home">
            <div className="w-8 h-8 rounded-lg bg-[#EAF2FF] flex items-center justify-center group-hover:bg-[#DBEAFE] transition-colors">
              <Shield className="w-4 h-4 text-[#3B82F6]" />
            </div>
            <span className="font-semibold text-[#111111] text-sm hidden sm:block">
              Leaked Key <span className="text-[#3B82F6]">Playbooks</span>
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-0.5">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === link.href || pathname.startsWith(link.href + "/")
                    ? "text-[#3B82F6] bg-[#EAF2FF]"
                    : "text-[#555B66] hover:text-[#111111] hover:bg-[#F8FAFC]"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-[#555B66] hover:text-[#111111] hover:border-[#3B82F6]/40 transition-all text-sm"
              aria-label="Open search"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:block">Search</span>
              <kbd className="hidden sm:block text-xs bg-white border border-[#E5E7EB] px-1.5 py-0.5 rounded font-mono text-[#9CA3AF]">/</kbd>
            </button>
            <a
              href="https://github.com/your-org/leaked-key-playbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg text-[#555B66] hover:text-[#111111] hover:bg-[#F8FAFC] transition-colors"
              aria-label="GitHub repository"
            >
              <GitBranch className="w-4 h-4" />
            </a>
            <button
              className="md:hidden p-2 rounded-lg text-[#555B66] hover:text-[#111111] hover:bg-[#F8FAFC] transition-colors"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white border-t border-[#E5E7EB] px-4 pb-4 shadow-[0_4px_6px_rgba(0,0,0,0.07)]">
            {NAV_LINKS.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "flex items-center justify-between py-3.5 border-b border-[#F3F4F6] text-sm font-medium",
                  pathname === link.href ? "text-[#3B82F6]" : "text-[#374151]"
                )}
              >
                {link.label}
                <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Search dialog */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#111111]/30 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) { setSearchOpen(false); setQuery(""); } }}
          role="dialog"
          aria-modal="true"
          aria-label="Search playbooks"
        >
          <div ref={searchRef} className="w-full max-w-xl bg-white border border-[#E5E7EB] rounded-2xl shadow-[0_20px_25px_rgba(0,0,0,0.08),0_10px_10px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#F3F4F6]">
              <Search className="w-4 h-4 text-[#9CA3AF] shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search providers, credentials, categories…"
                className="flex-1 bg-transparent text-[#111111] placeholder-[#9CA3AF] text-sm outline-none"
                aria-label="Search query"
              />
              <button onClick={() => { setSearchOpen(false); setQuery(""); }} className="text-[#9CA3AF] hover:text-[#111111] transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            {results.length > 0 ? (
              <ul role="listbox" className="py-2 max-h-80 overflow-y-auto">
                {results.map(r => (
                  <li key={r.id}>
                    <Link
                      href={`/playbooks/${r.providerSlug}/${r.credentialSlug}`}
                      className="flex items-center justify-between px-4 py-3 hover:bg-[#F8FAFC] transition-colors group"
                      onClick={() => { setSearchOpen(false); setQuery(""); }}
                    >
                      <div>
                        <p className="text-sm font-semibold text-[#111111]">{r.provider} — {r.credentialName}</p>
                        <p className="text-xs text-[#9CA3AF] mt-0.5">{r.providerCategory}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#3B82F6] transition-colors" />
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query.length > 1 ? (
              <div className="px-4 py-8 text-center text-sm text-[#9CA3AF]">
                No playbooks found for &ldquo;{query}&rdquo;
              </div>
            ) : (
              <div className="px-4 py-4">
                <p className="text-xs text-[#9CA3AF] mb-2 uppercase tracking-wider font-semibold">Quick access</p>
                <div className="flex flex-wrap gap-2">
                  {["AWS", "GitHub", "Stripe", "OpenAI", "Cloudflare"].map(s => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-[#555B66] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 hover:bg-[#EAF2FF] transition-all"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
