import Link from "next/link";
import { Shield, GitBranch, ExternalLink, ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Leaked Key Playbooks — an open-source credential incident response knowledge base.",
};

const FAQ = [
  {
    q: "What is a leaked credential?",
    a: "A leaked credential is any secret — API key, access token, password, webhook secret, database URL, or similar — that has been unintentionally exposed to unauthorized parties. This can happen through public git commits, CI/CD logs, screenshots, or compromised machines.",
  },
  {
    q: "Is deleting a leaked API key from GitHub enough?",
    a: "No. Deleting a file from a repository does not remove it from git history. Anyone who cloned the repository before deletion may still have the credential. You must revoke the credential through the provider's official mechanism and purge it from git history.",
  },
  {
    q: "What is the difference between revocation and rotation?",
    a: "Revocation disables the exposed credential so it can no longer authorize new requests. Rotation replaces it with a new credential. Both steps are usually required — revoke the old credential and rotate to a new one.",
  },
  {
    q: "Can old sessions remain active after revocation?",
    a: "Yes, depending on the provider. Some providers issue derived tokens (like AWS STS temporary credentials) that remain valid until their own expiry even after the parent credential is revoked. Each playbook documents the specific session persistence behavior.",
  },
  {
    q: "Are the instructions verified?",
    a: "Each playbook includes a verification status and last-verified date. Instructions marked 'Verified' are based on official provider documentation. Provider behavior can change — always verify critical steps with the official provider documentation before acting.",
  },
  {
    q: "Does this project automatically revoke credentials?",
    a: "No. This is an educational reference. It provides instructions for you to follow. It does not connect to any provider APIs or automatically take action on your behalf.",
  },
  {
    q: "Can I contribute a new provider?",
    a: "Yes. Contributions are welcome. See the Contributing section on GitHub for instructions on how to add a new provider playbook.",
  },
];

export default function AboutPage() {
  return (
    <div className="pt-16 min-h-screen">
      <div className="border-b border-[#1a3560] bg-[#0b1b3a]/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[#3395ff]/10 border border-[#3395ff]/30 flex items-center justify-center">
              <Shield className="w-5 h-5 text-[#3395ff]" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">About Leaked Key Playbooks</h1>
          </div>
          <p className="text-[#9ca3af] text-sm max-w-2xl leading-relaxed">
            An open-source, provider-specific incident response knowledge base for leaked credentials.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Mission */}
        <div className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-6">
          <h2 className="text-base font-semibold text-white mb-3">The Problem</h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed mb-4">
            Developers accidentally expose credentials constantly — through public git commits, CI/CD logs, screenshots, and misconfigured environments. When this happens, the standard advice is &ldquo;revoke and rotate.&rdquo; But that advice is dangerously incomplete.
          </p>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Every provider has different revocation mechanisms, different session persistence behavior, different audit log systems, and different blast radii. Without provider-specific knowledge, a developer may think they&apos;ve secured their infrastructure when they haven&apos;t.
          </p>
        </div>

        <div className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-6">
          <h2 className="text-base font-semibold text-white mb-3">Our Solution</h2>
          <p className="text-sm text-[#9ca3af] leading-relaxed mb-4">
            Leaked Key Playbooks provides structured, evidence-based, provider-specific response instructions. Each playbook covers the full incident response lifecycle: identification, revocation, investigation, and recovery.
          </p>
          <p className="text-sm text-[#9ca3af] leading-relaxed">
            Every factual claim is traceable to official provider documentation or independently reproduced behavior. Playbooks include verification dates and expire after 180 days to prevent stale information from causing harm.
          </p>
        </div>

        {/* Core philosophy */}
        <div className="rounded-xl border border-[#3395ff]/20 bg-[#3395ff]/5 p-6">
          <p className="text-sm font-medium text-[#60aeff] italic">
            &ldquo;Every credential has a different blast radius. Every provider needs a different response playbook.&rdquo;
          </p>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="text-base font-semibold text-white mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {FAQ.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#1a3560] bg-[#0b1b3a] p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{item.q}</h3>
                <p className="text-xs text-[#9ca3af] leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="rounded-xl border border-[#1a3560] bg-[#060d1f] p-5">
          <h2 className="text-sm font-semibold text-white mb-2">Disclaimer</h2>
          <p className="text-xs text-[#6b7280] leading-relaxed">
            Leaked Key Playbooks is an educational security reference. It does not automatically detect or revoke leaked credentials. Provider behavior may change without notice — always verify critical instructions with official provider documentation before taking action. This project does not replace professional incident response or security advice. Not affiliated with any listed provider.
          </p>
        </div>

        {/* Links */}
        <div className="flex flex-wrap gap-3">
          <a href="https://github.com/your-org/leaked-key-playbooks" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-[#060d1f] text-sm font-semibold hover:bg-[#f3f4f6] transition-colors">
            <GitBranch className="w-4 h-4" /> GitHub Repository
          </a>
          <Link href="/playbooks" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a3560] text-[#9ca3af] text-sm font-semibold hover:text-white hover:border-[#3395ff]/50 transition-all">
            Browse Playbooks <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <a href="https://github.com/your-org/leaked-key-playbooks/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#1a3560] text-[#9ca3af] text-sm font-semibold hover:text-white hover:border-[#3395ff]/50 transition-all">
            Contributing <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
