import Link from "next/link";
import { ArrowRight, Shield, Zap, Database, CreditCard, MessageSquare, Cloud, Code2, Lock } from "lucide-react";
import { SeverityBadge, VerificationBadge, LastVerified } from "./ui";
import type { Playbook } from "@/lib/types";

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  "Cloud Infrastructure": <Cloud className="w-4 h-4" />,
  "AI & Developer APIs":  <Zap className="w-4 h-4" />,
  "Source Control":       <Code2 className="w-4 h-4" />,
  "Payment & Financial":  <CreditCard className="w-4 h-4" />,
  "Communication":        <MessageSquare className="w-4 h-4" />,
  "Database & Storage":   <Database className="w-4 h-4" />,
  "Deployment & Hosting": <Shield className="w-4 h-4" />,
  "Identity & Auth":      <Lock className="w-4 h-4" />,
};

export default function PlaybookCard({ playbook }: { playbook: Playbook }) {
  const icon = CATEGORY_ICONS[playbook.providerCategory] ?? <Shield className="w-4 h-4" />;

  return (
    <Link
      href={`/playbooks/${playbook.providerSlug}/${playbook.credentialSlug}`}
      className="group block rounded-xl border border-[#E5E7EB] bg-white hover:border-[#3B82F6]/40 hover:shadow-[0_4px_14px_rgba(59,130,246,0.12)] transition-all duration-200 overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
    >
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-9 h-9 rounded-lg bg-[#EAF2FF] flex items-center justify-center text-[#3B82F6] shrink-0 group-hover:bg-[#DBEAFE] transition-colors">
            {icon}
          </div>
          <SeverityBadge level={playbook.severity} />
        </div>

        <h3 className="text-sm font-semibold text-[#111111] mb-0.5 group-hover:text-[#3B82F6] transition-colors">
          {playbook.provider}
        </h3>
        <p className="text-xs text-[#555B66] mb-2">{playbook.credentialName}</p>
        <p className="text-xs text-[#9CA3AF] leading-relaxed line-clamp-2 mb-4">
          {playbook.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs px-2 py-0.5 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] text-[#555B66]">
              {playbook.providerCategory}
            </span>
            <VerificationBadge status={playbook.verificationStatus} />
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-[#9CA3AF] group-hover:text-[#3B82F6] group-hover:translate-x-0.5 transition-all shrink-0" />
        </div>
      </div>

      <div className="px-5 py-2.5 border-t border-[#F3F4F6] bg-[#F8FAFC]">
        <LastVerified date={playbook.lastVerified} />
      </div>
    </Link>
  );
}
