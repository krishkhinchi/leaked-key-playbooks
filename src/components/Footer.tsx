import Link from "next/link";
import { Shield, GitBranch, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#F8FAFC] border-t border-[#E5E7EB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-lg bg-[#EAF2FF] flex items-center justify-center">
                <Shield className="w-3.5 h-3.5 text-[#3B82F6]" />
              </div>
              <span className="font-semibold text-[#111111] text-sm">Leaked Key Playbooks</span>
            </Link>
            <p className="text-xs text-[#555B66] leading-relaxed max-w-xs">
              Provider-specific incident response playbooks for leaked credentials. Open-source, community-reviewed, evidence-backed.
            </p>
          </div>

          {/* Playbooks */}
          <div>
            <p className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">Playbooks</p>
            <ul className="space-y-2.5">
              {[
                { href: "/playbooks",                              label: "All Playbooks" },
                { href: "/playbooks/aws/access-key",               label: "AWS Access Keys" },
                { href: "/playbooks/github/personal-access-token", label: "GitHub Tokens" },
                { href: "/playbooks/stripe/secret-key",            label: "Stripe Keys" },
                { href: "/playbooks/openai/api-key",               label: "OpenAI Keys" },
              ].map(l => (
                <li key={l.href}>
                  <Link href={l.href} className="text-xs text-[#555B66] hover:text-[#3B82F6] transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <p className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">Resources</p>
            <ul className="space-y-2.5">
              {[
                { href: "/response-guide", label: "Response Guide" },
                { href: "/providers",      label: "Provider Directory" },
                { href: "/about",          label: "About" },
                { href: "https://github.com/your-org/leaked-key-playbooks/blob/main/CONTRIBUTING.md", label: "Contributing", external: true },
                { href: "https://github.com/your-org/leaked-key-playbooks/blob/main/SECURITY.md",     label: "Security Policy", external: true },
              ].map(l => (
                <li key={l.href}>
                  {"external" in l && l.external ? (
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-xs text-[#555B66] hover:text-[#3B82F6] transition-colors flex items-center gap-1">
                      {l.label} <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  ) : (
                    <Link href={l.href} className="text-xs text-[#555B66] hover:text-[#3B82F6] transition-colors">{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Project */}
          <div>
            <p className="text-xs font-bold text-[#111111] uppercase tracking-wider mb-4">Project</p>
            <ul className="space-y-2.5">
              {[
                { href: "https://github.com/your-org/leaked-key-playbooks",                   label: "GitHub Repository" },
                { href: "https://github.com/your-org/leaked-key-playbooks/issues/new/choose", label: "Report an Issue" },
                { href: "https://github.com/your-org/leaked-key-playbooks/blob/main/LICENSE", label: "License (MIT)" },
              ].map(l => (
                <li key={l.href}>
                  <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-xs text-[#555B66] hover:text-[#3B82F6] transition-colors flex items-center gap-1">
                    {l.label} <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
              <p className="text-xs text-[#555B66]">
                <span className="text-[#EF4444] font-semibold">Security issue?</span>{" "}
                Do not open a public issue. Email{" "}
                <a href="mailto:security@example.com" className="text-[#3B82F6] hover:underline">security@example.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-[#9CA3AF]">
            © 2026 Leaked Key Playbooks. MIT License. Not affiliated with any listed provider.
          </p>
          <div className="flex items-center gap-4">
            <p className="text-xs text-[#9CA3AF] hidden sm:block">Educational reference only. Verify critical steps with official provider documentation.</p>
            <a href="https://github.com/your-org/leaked-key-playbooks" target="_blank" rel="noopener noreferrer" className="text-[#9CA3AF] hover:text-[#3B82F6] transition-colors" aria-label="GitHub">
              <GitBranch className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
