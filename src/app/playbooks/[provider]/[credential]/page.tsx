import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, AlertTriangle, Shield, Search, RotateCcw, FileSearch, CheckCircle, ExternalLink, BookOpen, Flag, Clock, ChevronRight } from "lucide-react";
import { getPlaybook } from "@/lib/playbooks";
import { SeverityBadge, VerificationBadge, EvidenceBadge, CodeBlock, SectionCard, LastVerified } from "@/components/ui";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ provider: string; credential: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { provider, credential } = await params;
  const playbook = getPlaybook(provider, credential);
  if (!playbook) return { title: "Playbook Not Found" };
  return {
    title: `${playbook.provider} ${playbook.credentialName} — Response Playbook`,
    description: playbook.description,
  };
}

export default async function PlaybookPage({ params }: Props) {
  const { provider, credential } = await params;
  const playbook = getPlaybook(provider, credential);
  if (!playbook) notFound();

  return (
    <div className="pt-16 min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-[#1a3560] bg-[#0b1b3a]/50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-[#6b7280]">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/playbooks" className="hover:text-white transition-colors">Playbooks</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-[#9ca3af]">{playbook.provider} — {playbook.credentialName}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-sm text-[#6b7280] hover:text-white transition-colors mb-6">
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Playbooks
        </Link>

        {/* Header */}
        <div className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-6 mb-6">
          <div className="flex flex-wrap items-start gap-3 mb-4">
            <SeverityBadge level={playbook.severity} />
            <VerificationBadge status={playbook.verificationStatus} />
            <EvidenceBadge level={playbook.evidenceLevel} />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
            {playbook.provider} — {playbook.credentialName}
          </h1>
          <p className="text-[#9ca3af] text-sm mb-4">{playbook.description}</p>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#1a3560]">
            <LastVerified date={playbook.lastVerified} />
            <span className="text-xs text-[#6b7280]">Category: <span className="text-[#9ca3af]">{playbook.providerCategory}</span></span>
          </div>
        </div>

        {/* Emergency warning */}
        <div className="rounded-xl border border-[#ef4444]/30 bg-[#fee2e2]/5 p-5 mb-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-[#fca5a5] mb-1">Immediate Action Required</p>
              <p className="text-xs text-[#fca5a5]/80 leading-relaxed">
                Deleting a leaked credential from a repository does not invalidate it. Assume it has already been copied. Follow the revocation steps below immediately, then investigate for unauthorized access.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          {/* Section 1: What Is This Credential */}
          <SectionCard title="What Is This Credential?" icon={<BookOpen className="w-4 h-4" />}>
            <p className="text-sm text-[#9ca3af] leading-relaxed mb-4">{playbook.description}</p>
            <div>
              <p className="text-xs font-semibold text-[#6b7280] uppercase tracking-wider mb-2">Permissions Granted</p>
              <ul className="space-y-1.5">
                {playbook.permissions.map((p, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                    <span className="w-1 h-1 rounded-full bg-[#3395ff] mt-1.5 shrink-0" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </SectionCard>

          {/* Section 2: Exposure Impact */}
          <SectionCard title="Exposure & Blast Radius" icon={<AlertTriangle className="w-4 h-4" />}>
            <ul className="space-y-2">
              {playbook.exposureImpact.map((impact, i) => (
                <li key={i} className="flex items-start gap-2.5 p-3 rounded-lg bg-[#fee2e2]/5 border border-[#ef4444]/10">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#ef4444] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#fca5a5]">{impact}</span>
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Section 3: Immediate Response */}
          <SectionCard title="Immediate Response Steps" icon={<Shield className="w-4 h-4" />}>
            <div className="space-y-4">
              {playbook.immediateActions.map(action => (
                <div key={action.order} className="flex gap-4">
                  <div className="w-7 h-7 rounded-full bg-[#3395ff]/10 border border-[#3395ff]/30 flex items-center justify-center text-xs font-bold text-[#3395ff] shrink-0">
                    {action.order}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white mb-1">{action.title}</p>
                    <p className="text-xs text-[#9ca3af] leading-relaxed mb-2">{action.description}</p>
                    {action.command && <CodeBlock code={action.command} />}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Section 4: Revocation vs Rotation */}
          <SectionCard title="Revocation vs Rotation" icon={<RotateCcw className="w-4 h-4" />}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-lg bg-[#060d1f] border border-[#1a3560]">
                <p className="text-xs font-semibold text-[#ef4444] uppercase tracking-wider mb-2">Revocation</p>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{playbook.revocation}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#060d1f] border border-[#1a3560]">
                <p className="text-xs font-semibold text-[#22c55e] uppercase tracking-wider mb-2">Rotation</p>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{playbook.rotation}</p>
              </div>
            </div>
          </SectionCard>

          {/* Section 5: Grace Period */}
          <SectionCard title="Grace Period & Session Persistence" icon={<Clock className="w-4 h-4" />}>
            <div className="space-y-3">
              <div className="p-4 rounded-lg bg-[#060d1f] border border-[#1a3560]">
                <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Grace Period</p>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{playbook.gracePeriod}</p>
              </div>
              <div className="p-4 rounded-lg bg-[#060d1f] border border-[#1a3560]">
                <p className="text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-1.5">Session Persistence</p>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{playbook.sessionPersistence}</p>
              </div>
            </div>
          </SectionCard>

          {/* Section 6: Investigation */}
          <SectionCard title="Investigation Checklist" icon={<FileSearch className="w-4 h-4" />}>
            <ul className="space-y-2">
              {playbook.investigation.map((item, i) => (
                <li key={i} className="flex items-start gap-2.5 text-xs text-[#9ca3af]">
                  <CheckCircle className="w-3.5 h-3.5 text-[#6b7280] shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </SectionCard>

          {/* Section 7: Recovery & Prevention */}
          <div className="grid sm:grid-cols-2 gap-5">
            <SectionCard title="Recovery Steps" icon={<CheckCircle className="w-4 h-4" />}>
              <ul className="space-y-2">
                {playbook.recovery.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                    <span className="w-1 h-1 rounded-full bg-[#22c55e] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>

            <SectionCard title="Prevention" icon={<Shield className="w-4 h-4" />}>
              <ul className="space-y-2">
                {playbook.prevention.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-[#9ca3af]">
                    <span className="w-1 h-1 rounded-full bg-[#3395ff] mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* Section 8: Sources */}
          <SectionCard title="Sources & Evidence" icon={<ExternalLink className="w-4 h-4" />}>
            <div className="space-y-2">
              {playbook.sources.map((source, i) => (
                <a
                  key={i}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg bg-[#060d1f] border border-[#1a3560] hover:border-[#3395ff]/40 transition-colors group"
                >
                  <div>
                    <p className="text-xs font-medium text-white group-hover:text-[#60aeff] transition-colors">{source.title}</p>
                    <p className="text-xs text-[#6b7280] mt-0.5 capitalize">{source.type.replace(/-/g, " ")}</p>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#6b7280] group-hover:text-[#3395ff] transition-colors shrink-0" />
                </a>
              ))}
            </div>
            <p className="text-xs text-[#6b7280] mt-4 leading-relaxed">
              Always verify critical instructions with official provider documentation before taking action. Provider behavior may change without notice.
            </p>
          </SectionCard>

          {/* Section 9: Report Issue */}
          <div className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-5">
            <div className="flex items-start gap-3">
              <Flag className="w-4 h-4 text-[#6b7280] shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-white mb-1">Found an issue with this playbook?</p>
                <p className="text-xs text-[#6b7280] mb-3">
                  If these instructions are incorrect, outdated, or missing important information, please report it so we can improve the playbook.
                </p>
                <a
                  href={`https://github.com/your-org/leaked-key-playbooks/issues/new?template=playbook-issue.md&title=Issue+with+${playbook.provider}+${playbook.credentialName}+playbook`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-[#0f2347] border border-[#1a3560] text-[#9ca3af] hover:text-white hover:border-[#3395ff]/50 transition-all"
                >
                  <Flag className="w-3 h-3" />
                  Report an Issue on GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
