"use client";
import { useState, useMemo } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { PLAYBOOKS } from "@/lib/playbooks";
import PlaybookCard from "@/components/PlaybookCard";
import { EmptyState } from "@/components/ui";
import type { SeverityLevel } from "@/lib/types";

const CATEGORIES = Array.from(new Set(PLAYBOOKS.map(p => p.providerCategory)));
const SEVERITIES: SeverityLevel[] = ["critical", "high", "medium", "low"];

const SELECT_CLS = "px-3 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-sm text-[#374151] focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.05)]";

export default function PlaybooksPage() {
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState<SeverityLevel | "">("");
  const [sort, setSort]         = useState<"alpha" | "severity" | "verified">("severity");

  const filtered = useMemo(() => {
    let results = PLAYBOOKS;
    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(p =>
        p.provider.toLowerCase().includes(q) ||
        p.credentialName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.providerCategory.toLowerCase().includes(q)
      );
    }
    if (category) results = results.filter(p => p.providerCategory === category);
    if (severity) results = results.filter(p => p.severity === severity);

    const severityOrder: Record<SeverityLevel, number> = { critical: 0, high: 1, medium: 2, low: 3 };
    if (sort === "severity")  results = [...results].sort((a, b) => severityOrder[a.severity] - severityOrder[b.severity]);
    else if (sort === "alpha") results = [...results].sort((a, b) => a.provider.localeCompare(b.provider));
    else if (sort === "verified") results = [...results].sort((a, b) => new Date(b.lastVerified).getTime() - new Date(a.lastVerified).getTime());

    return results;
  }, [query, category, severity, sort]);

  const hasFilters = query || category || severity;

  return (
    <div className="pt-16 min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3 tracking-tight">Credential Response Playbooks</h1>
          <p className="text-[#555B66] text-base">Find exactly what to do when a credential is exposed.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Search + Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by provider, credential type, or category…"
              className="w-full pl-9 pr-9 py-2.5 rounded-lg bg-white border border-[#E5E7EB] text-[#111111] placeholder-[#9CA3AF] text-sm focus:outline-none focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/10 transition-colors shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
              aria-label="Search playbooks"
            />
            {query && (
              <button onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#374151] transition-colors" aria-label="Clear search">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal className="w-4 h-4 text-[#9CA3AF] shrink-0" />
            <select value={category} onChange={e => setCategory(e.target.value)} className={SELECT_CLS} aria-label="Filter by category">
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <select value={severity} onChange={e => setSeverity(e.target.value as SeverityLevel | "")} className={SELECT_CLS} aria-label="Filter by severity">
              <option value="">All Severities</option>
              {SEVERITIES.map(s => <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
            </select>
            <select value={sort} onChange={e => setSort(e.target.value as typeof sort)} className={SELECT_CLS} aria-label="Sort playbooks">
              <option value="severity">Sort: Severity</option>
              <option value="alpha">Sort: A–Z</option>
              <option value="verified">Sort: Recently Verified</option>
            </select>
          </div>
        </div>

        {/* Active filters */}
        {hasFilters && (
          <div className="flex items-center gap-2 mb-5 flex-wrap">
            <span className="text-sm text-[#555B66]">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
            <button
              onClick={() => { setQuery(""); setCategory(""); setSeverity(""); }}
              className="text-xs px-3 py-1.5 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-[#555B66] hover:text-[#3B82F6] hover:border-[#3B82F6]/40 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}

        {/* Results */}
        {filtered.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(p => <PlaybookCard key={p.id} playbook={p} />)}
          </div>
        ) : (
          <EmptyState
            title="No playbooks found"
            description={`No results for "${query}". Try a different search term or clear your filters.`}
            action={
              <button
                onClick={() => { setQuery(""); setCategory(""); setSeverity(""); }}
                className="text-sm px-5 py-2 rounded-lg bg-[#3B82F6] text-white font-semibold hover:bg-[#2563EB] transition-colors"
              >
                Clear filters
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
