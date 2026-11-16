import Link from "next/link";
import { AlertTriangle, Shield, Search, RotateCcw, FileSearch, CheckCircle, ArrowRight, ExternalLink } from "lucide-react";
import { PLAYBOOKS } from "@/lib/playbooks";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Emergency Response Guide",
  description: "A credential just leaked. Start here. Step-by-step guidance for responding to credential exposure incidents.",
};

const STEPS = [
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "text-[#ef4444]",
    bg: "bg-[#fee2e2]/10 border-[#ef4444]/20",
    step: "01",
    title: "Stop further exposure",
    description: "If the credential is in a public repository, do not simply delete the file. The git history still contains it. Use git-filter-repo or BFG Repo Cleaner to purge it from history, then force-push. If it was in a CI/CD log, clear the log.",
    warning: "Deleting a file from a repository does not remove it from git history. Anyone who cloned the repo before deletion may still have the credential.",
  },
  {
    icon: <Search className="w-5 h-5" />,
    color: "text-[#3395ff]",
    bg: "bg-[#e6f1ff]/5 border-[#3395ff]/20",
    step: "02",
    title: "Identify the credential and provider",
    description: "Determine exactly which credential was exposed, which provider issued it, and what permissions it grants. The blast radius varies enormously — an AWS root key is very different from a read-only analytics token.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    color: "text-[#f59e0b]",
    bg: "bg-[#fef3c7]/5 border-[#f59e0b]/20",
    step: "03",
    title: "Determine the credential's permissions",
    description: "Before revoking, understand what the credential can access. This determines the scope of your investigation. A credential with write access to production databases requires a much more thorough investigation than a read-only staging key.",
  },
  {
    icon: <RotateCcw className="w-5 h-5" />,
    color: "text-[#ef4444]",
    bg: "bg-[#fee2e2]/10 border-[#ef4444]/20",
    step: "04",
    title: "Revoke or rotate using official instructions",
    description: "Follow the provider-specific playbook. Generic revocation steps may miss critical details — some providers require separate session invalidation, some have grace periods, and some require additional steps to fully terminate access.",
  },
  {
    icon: <FileSearch className="w-5 h-5" />,
    color: "text-[#3395ff]",
    bg: "bg-[#e6f1ff]/5 border-[#3395ff]/20",
    step: "05",
    title: "Investigate potential unauthorized usage",
    description: "Review audit logs, API call history, and access patterns for the period the credential was exposed. Look for unusual IP addresses, unexpected resource access, data downloads, or configuration changes.",
  },
  {
    icon: <AlertTriangle className="w-5 h-5" />,
    color: "text-[#f59e0b]",
    bg: "bg-[#fef3c7]/5 border-[#f59e0b]/20",
    step: "06",
    title: "Review financial and operational impact",
    description: "Check billing dashboards for unexpected charges. Review resource usage for unauthorized provisioning. For payment APIs, check for fraudulent transactions. Document everything for potential incident reporting.",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-[#22c55e]",
    bg: "bg-[#dcfce7]/5 border-[#22c55e]/20",
    step: "07",
    title: "Update dependent applications",
    description: "Update all services, CI/CD pipelines, environment variables, and secrets managers with the new credential. Verify each consumer is working correctly with the replacement before proceeding.",
  },
  {
    icon: <Shield className="w-5 h-5" />,
    color: "text-[#22c55e]",
    bg: "bg-[#dcfce7]/5 border-[#22c55e]/20",
    step: "08",
    title: "Remove the exposed secret from accessible locations",
    description: "Purge from git history, CI/CD logs, error tracking systems, screenshots, and any other location where the credential may have been captured. Check Slack, email, and documentation tools.",
  },
  {
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-[#3395ff]",
    bg: "bg-[#e6f1ff]/5 border-[#3395ff]/20",
    step: "09",
    title: "Implement preventive controls",
    description: "Enable secret scanning, add pre-commit hooks, implement least-privilege access, use a secrets manager, and set up monitoring alerts. Document the incident and share learnings with your team.",
  },
];

const COMMON_MISTAKES = [
  "Deleting the file from the repository without purging git history",
  "Assuming revocation is immediate when the provider has a grace period",
  "Forgetting to invalidate derived sessions and temporary tokens",
  "Not checking all regions or environments for unauthorized activity",
  "Rotating the key but not updating all consumers, causing service outages",
  "Not reviewing billing for unexpected charges from the exposure window",
];

export default function ResponseGuidePage() {
  const criticalPlaybooks = PLAYBOOKS.filter(p => p.severity === "critical").slice(0, 4);

  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1a3560] bg-[#0b1b3a]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fee2e2]/10 border border-[#ef4444]/30 text-xs text-[#fca5a5] mb-4">
            <AlertTriangle className="w-3 h-3" />
            Emergency Response Guide
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">A credential just leaked. Start here.</h1>
          <p className="text-[#9ca3af] text-sm max-w-2xl leading-relaxed">
            This guide walks you through the general incident response process for a leaked credential. For provider-specific instructions, find your provider in the playbooks directory.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {/* Critical warning */}
        <div className="rounded-xl border border-[#ef4444]/30 bg-[#fee2e2]/5 p-5 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#ef4444] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-[#fca5a5] mb-1">Critical: Do not assume deletion equals revocation</p>
              <p className="text-xs text-[#fca5a5]/80 leading-relaxed">
                Deleting a leaked secret from a repository does not invalidate the credential. Assume it may already have been copied and used. You must revoke the credential through the provider&apos;s official mechanism, then investigate for unauthorized access.
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {STEPS.map(step => (
            <div key={step.step} className={`rounded-xl border p-5 ${step.bg}`}>
              <div className="flex items-start gap-4">
                <div className={`w-9 h-9 rounded-lg bg-[#0b1b3a] border border-[#1a3560] flex items-center justify-center shrink-0 ${step.color}`}>
                  {step.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono text-[#6b7280]">{step.step}</span>
                    <h2 className="text-sm font-semibold text-white">{step.title}</h2>
                  </div>
                  <p className="text-xs text-[#9ca3af] leading-relaxed">{step.description}</p>
                  {step.warning && (
                    <div className="mt-3 flex items-start gap-2 p-2.5 rounded-lg bg-[#fee2e2]/10 border border-[#ef4444]/20">
                      <AlertTriangle className="w-3 h-3 text-[#ef4444] shrink-0 mt-0.5" />
                      <p className="text-xs text-[#fca5a5]">{step.warning}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Common mistakes */}
        <div className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-6 mb-8">
          <h2 className="text-sm font-semibold text-white mb-4">Common Mistakes to Avoid</h2>
          <ul className="space-y-2">
            {COMMON_MISTAKES.map((mistake, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-[#9ca3af]">
                <AlertTriangle className="w-3.5 h-3.5 text-[#f59e0b] shrink-0 mt-0.5" />
                {mistake}
              </li>
            ))}
          </ul>
        </div>

        {/* Provider playbooks CTA */}
        <div className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-6 mb-6">
          <h2 className="text-sm font-semibold text-white mb-2">Find Your Provider&apos;s Playbook</h2>
          <p className="text-xs text-[#6b7280] mb-4">
            This guide covers the general process. For provider-specific revocation steps, audit log locations, and session invalidation details, use the playbooks below.
          </p>
          <div className="grid sm:grid-cols-2 gap-2 mb-4">
            {criticalPlaybooks.map(p => (
              <Link
                key={p.id}
                href={`/playbooks/${p.providerSlug}/${p.credentialSlug}`}
                className="flex items-center justify-between p-3 rounded-lg bg-[#060d1f] border border-[#1a3560] hover:border-[#3395ff]/40 transition-colors group text-xs"
              >
                <span className="text-[#9ca3af] group-hover:text-white transition-colors">{p.provider} — {p.credentialName}</span>
                <ArrowRight className="w-3 h-3 text-[#6b7280] group-hover:text-[#3395ff] transition-colors" />
              </Link>
            ))}
          </div>
          <Link href="/playbooks" className="inline-flex items-center gap-1.5 text-xs text-[#3395ff] hover:text-[#60aeff] transition-colors font-medium">
            Browse all playbooks <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        {/* Disclaimer */}
        <div className="p-4 rounded-xl bg-[#060d1f] border border-[#1a3560]">
          <p className="text-xs text-[#6b7280] leading-relaxed">
            <strong className="text-[#9ca3af]">Disclaimer:</strong> This is an educational incident response reference. It does not automatically detect or revoke credentials. Provider behavior may change — always verify critical steps with official provider documentation. This guide does not replace professional incident response or security advice.
          </p>
        </div>
      </div>
    </div>
  );
}
