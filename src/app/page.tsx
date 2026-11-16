import Link from "next/link";
import { ArrowRight, Shield, Search, AlertTriangle, FileSearch, CheckCircle, GitBranch, ChevronRight, Zap, Database, CreditCard, MessageSquare, Cloud, Code2, Lock, ExternalLink } from "lucide-react";
import { PLAYBOOKS } from "@/lib/playbooks";
import PlaybookCard from "@/components/PlaybookCard";
import HeroSection from "@/components/HeroSection";

const STEPS = [
  { icon: <Search className="w-5 h-5" />,      step: "01", title: "Identify",    description: "Find the exposed credential and its provider. Understand what permissions it grants and what resources it can access." },
  { icon: <Shield className="w-5 h-5" />,      step: "02", title: "Contain",     description: "Follow provider-specific revocation and rotation instructions. Deactivate the exposed credential immediately." },
  { icon: <FileSearch className="w-5 h-5" />,  step: "03", title: "Investigate", description: "Review audit logs, active sessions, and API call history. Identify any unauthorized access or data exfiltration." },
  { icon: <CheckCircle className="w-5 h-5" />, step: "04", title: "Recover",     description: "Update all consumers with new credentials. Implement preventive controls to stop future exposure." },
];

const CATEGORIES = [
  { name: "Cloud Infrastructure", icon: <Cloud className="w-4 h-4" />,        providers: ["AWS", "GCP", "Azure", "Cloudflare"] },
  { name: "AI & Developer APIs",  icon: <Zap className="w-4 h-4" />,          providers: ["OpenAI", "Anthropic", "Google AI"] },
  { name: "Source Control",       icon: <Code2 className="w-4 h-4" />,        providers: ["GitHub", "GitLab", "npm"] },
  { name: "Payment & Financial",  icon: <CreditCard className="w-4 h-4" />,   providers: ["Stripe"] },
  { name: "Communication",        icon: <MessageSquare className="w-4 h-4" />, providers: ["Twilio", "SendGrid", "Slack"] },
  { name: "Database & Storage",   icon: <Database className="w-4 h-4" />,     providers: ["Supabase", "PlanetScale"] },
  { name: "Deployment & Hosting", icon: <Shield className="w-4 h-4" />,       providers: ["Vercel", "Railway"] },
  { name: "Identity & Auth",      icon: <Lock className="w-4 h-4" />,         providers: ["Auth0", "Okta"] },
];

const WHY_ITEMS = [
  { title: "Different revocation mechanisms",  description: "Some providers invalidate keys instantly. Others have propagation delays. Some require separate session invalidation." },
  { title: "Session persistence varies",       description: "Derived tokens and active sessions may remain valid even after the original credential is revoked." },
  { title: "Different audit log systems",      description: "Each provider exposes different levels of API call history, IP logging, and access patterns." },
  { title: "Different blast radius",           description: "An AWS access key may expose your entire infrastructure. An OpenAI key may expose billing. Each requires a different response." },
];

export default function HomePage() {
  const featuredPlaybooks = PLAYBOOKS.slice(0, 6);

  return (
    <div className="pt-16 bg-white">
      <HeroSection playbookCount={PLAYBOOKS.length} />

      {/* ── How It Works ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-t border-[#E5E7EB]" id="how-it-works">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4 tracking-tight">How It Works</h2>
            <p className="text-[#555B66] text-base max-w-lg mx-auto">A structured four-step process for every credential exposure incident.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {STEPS.map((step, i) => (
              <div key={step.step} className="relative p-6 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#3B82F6]/40 hover:shadow-[0_4px_14px_rgba(59,130,246,0.08)] transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 -right-2.5 z-10">
                    <ChevronRight className="w-4 h-4 text-[#D1D5DB]" />
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#EAF2FF] flex items-center justify-center text-[#3B82F6]">
                    {step.icon}
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#9CA3AF]">{step.step}</span>
                </div>
                <h3 className="text-base font-semibold text-[#111111] mb-2">{step.title}</h3>
                <p className="text-sm text-[#555B66] leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Playbooks ─────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-3 tracking-tight">Featured Playbooks</h2>
              <p className="text-[#555B66] text-base">Provider-specific response instructions for the most common credential types.</p>
            </div>
            <Link href="/playbooks" className="hidden sm:inline-flex items-center gap-1.5 text-sm text-[#3B82F6] hover:text-[#2563EB] transition-colors font-semibold">
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredPlaybooks.map(p => <PlaybookCard key={p.id} playbook={p} />)}
          </div>

          <div className="mt-8 sm:hidden text-center">
            <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-[#3B82F6] font-semibold">
              View all playbooks <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Provider Categories ────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4 tracking-tight">Provider Categories</h2>
            <p className="text-[#555B66] text-base max-w-lg mx-auto">Organized by service type so you can find the right playbook quickly.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CATEGORIES.map(cat => (
              <Link
                key={cat.name}
                href={`/providers?category=${encodeURIComponent(cat.name)}`}
                className="group p-5 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#3B82F6]/40 hover:shadow-[0_4px_14px_rgba(59,130,246,0.08)] transition-all duration-200 shadow-[0_1px_3px_rgba(0,0,0,0.06)]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-[#EAF2FF] flex items-center justify-center text-[#3B82F6] group-hover:bg-[#DBEAFE] transition-colors">
                    {cat.icon}
                  </div>
                  <h3 className="text-sm font-semibold text-[#111111]">{cat.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {cat.providers.map(p => (
                    <span key={p} className="text-xs px-2 py-0.5 rounded-full bg-[#F8FAFC] text-[#555B66] border border-[#E5E7EB]">{p}</span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why This Project ───────────────────────────────────────────────── */}
      <section className="py-24 bg-white border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-5 tracking-tight">
                Generic advice isn&apos;t enough.
              </h2>
              <p className="text-[#555B66] text-base leading-relaxed mb-6">
                &ldquo;Revoke and rotate&rdquo; sounds simple. But every provider has different revocation mechanisms, different session persistence behavior, and different audit log systems. Without provider-specific knowledge, you may think you&apos;re safe when you&apos;re not.
              </p>
              <div className="p-4 rounded-xl bg-[#FEF2F2] border border-[#FECACA]">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-[#EF4444] shrink-0 mt-0.5" />
                  <p className="text-sm text-[#DC2626] leading-relaxed">
                    <strong>Critical:</strong> Deleting a leaked secret from a repository does not invalidate the credential. Assume it may already have been copied and used.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {WHY_ITEMS.map(item => (
                <div key={item.title} className="flex items-start gap-4 p-5 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#3B82F6]/30 transition-colors shadow-[0_1px_3px_rgba(0,0,0,0.06)]">
                  <div className="w-2 h-2 rounded-full bg-[#3B82F6] mt-2 shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-[#111111] mb-1">{item.title}</h3>
                    <p className="text-sm text-[#555B66] leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Community CTA ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-[#F8FAFC] border-t border-[#E5E7EB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="rounded-2xl border border-[#DBEAFE] bg-[#EFF6FF] p-10 sm:p-16 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(59,130,246,0.06),transparent)]" aria-hidden />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#111111] mb-4 tracking-tight">
                Security knowledge should be open to everyone.
              </h2>
              <p className="text-[#555B66] text-base max-w-xl mx-auto mb-10">
                Help us build a reliable, community-reviewed database of credential incident response playbooks. Every contribution makes developers safer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="https://github.com/your-org/leaked-key-playbooks"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg bg-[#3B82F6] text-white font-semibold text-sm hover:bg-[#2563EB] hover:shadow-[0_4px_14px_rgba(59,130,246,0.35)] transition-all"
                >
                  <GitBranch className="w-4 h-4" />
                  Contribute on GitHub
                </a>
                <a
                  href="https://github.com/your-org/leaked-key-playbooks/blob/main/CONTRIBUTING.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg border border-[#BFDBFE] bg-white text-[#374151] font-semibold text-sm hover:border-[#3B82F6]/60 hover:text-[#3B82F6] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
                >
                  Read Contribution Guidelines
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
