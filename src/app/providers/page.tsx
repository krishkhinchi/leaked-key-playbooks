"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ExternalLink, CheckCircle, Clock, Search } from "lucide-react";
import { PROVIDERS, getProvidersByCategory } from "@/lib/providers";
import { PLAYBOOKS } from "@/lib/playbooks";

export default function ProvidersPage() {
  const [query, setQuery] = useState("");
  const byCategory = getProvidersByCategory();

  const filtered = query.trim()
    ? PROVIDERS.filter(p =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.category.toLowerCase().includes(query.toLowerCase())
      )
    : null;

  const displayCategories = filtered
    ? Object.fromEntries(
        Object.entries(byCategory).map(([cat, providers]) => [
          cat,
          providers.filter(p => filtered.includes(p)),
        ]).filter(([, providers]) => (providers as typeof PROVIDERS).length > 0)
      )
    : byCategory;

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1a3560] bg-[#0b1b3a]/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Provider Directory</h1>
          <p className="text-[#9ca3af] text-sm mb-6">Browse all supported providers and their available credential playbooks.</p>

          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6b7280]" />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search providers…"
              className="w-full pl-9 pr-4 py-2.5 rounded-lg bg-[#060d1f] border border-[#1a3560] text-white placeholder-[#6b7280] text-sm focus:outline-none focus:border-[#3395ff]/60 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-10">
        {Object.entries(displayCategories).map(([category, providers]) => (
          <div key={category}>
            <h2 className="text-sm font-semibold text-[#9ca3af] uppercase tracking-wider mb-4">{category}</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {(providers as typeof PROVIDERS).map(provider => {
                const playbooks = PLAYBOOKS.filter(p => p.providerSlug === provider.slug);
                return (
                  <div key={provider.slug} className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-5 hover:border-[#3395ff]/40 transition-colors">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div>
                        <h3 className="text-sm font-semibold text-white">{provider.name}</h3>
                        <p className="text-xs text-[#6b7280] mt-0.5">{provider.description}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium shrink-0 ${
                        provider.status === "verified"
                          ? "bg-[#dcfce7] text-[#16a34a] border border-[#86efac]"
                          : "bg-[#e6f1ff] text-[#1d6fe8] border border-[#93c5fd]"
                      }`}>
                        {provider.status === "verified" ? <CheckCircle className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {provider.status === "verified" ? "Active" : "Planned"}
                      </span>
                    </div>

                    {playbooks.length > 0 ? (
                      <div className="space-y-1.5 mb-4">
                        {playbooks.map(pb => (
                          <Link
                            key={pb.id}
                            href={`/playbooks/${pb.providerSlug}/${pb.credentialSlug}`}
                            className="flex items-center justify-between text-xs text-[#9ca3af] hover:text-[#60aeff] transition-colors group"
                          >
                            <span>{pb.credentialName}</span>
                            <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-[#6b7280] mb-4 italic">Playbooks coming soon</p>
                    )}

                    <div className="flex items-center gap-2 pt-3 border-t border-[#1a3560]">
                      <a
                        href={provider.docsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-[#3395ff] transition-colors"
                      >
                        Docs <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                      <span className="text-[#1a3560]">·</span>
                      <a
                        href={provider.securityUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-[#6b7280] hover:text-[#3395ff] transition-colors"
                      >
                        Security <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
