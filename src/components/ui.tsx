"use client";
import { useState, useEffect } from "react";
import { Check, Copy, AlertTriangle, Info, CheckCircle, Clock } from "lucide-react";
import clsx from "clsx";
import type { SeverityLevel, VerificationStatus, EvidenceLevel } from "@/lib/types";

// ── Severity Badge ────────────────────────────────────────────────────────────
const SEVERITY_CONFIG: Record<SeverityLevel, { label: string; classes: string }> = {
  critical: { label: "Critical", classes: "bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]" },
  high:     { label: "High",     classes: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]" },
  medium:   { label: "Medium",   classes: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]" },
  low:      { label: "Low",      classes: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]" },
};

export function SeverityBadge({ level }: { level: SeverityLevel }) {
  const cfg = SEVERITY_CONFIG[level];
  return (
    <span className={clsx("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border", cfg.classes)}>
      {level === "critical" && <AlertTriangle className="w-3 h-3" />}
      {cfg.label}
    </span>
  );
}

// ── Verification Badge ────────────────────────────────────────────────────────
const VERIFICATION_CONFIG: Record<VerificationStatus, { label: string; icon: React.ReactNode; classes: string }> = {
  verified:   { label: "Verified",   icon: <CheckCircle className="w-3 h-3" />, classes: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]" },
  unverified: { label: "Unverified", icon: <Info className="w-3 h-3" />,        classes: "bg-[#F9FAFB] text-[#6B7280] border-[#E5E7EB]" },
  stale:      { label: "Stale",      icon: <Clock className="w-3 h-3" />,       classes: "bg-[#FFFBEB] text-[#D97706] border-[#FDE68A]" },
  planned:    { label: "Planned",    icon: <Clock className="w-3 h-3" />,       classes: "bg-[#EFF6FF] text-[#3B82F6] border-[#BFDBFE]" },
};

export function VerificationBadge({ status }: { status: VerificationStatus }) {
  const cfg = VERIFICATION_CONFIG[status];
  return (
    <span className={clsx("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border", cfg.classes)}>
      {cfg.icon}
      {cfg.label}
    </span>
  );
}

// ── Evidence Badge ────────────────────────────────────────────────────────────
const EVIDENCE_LABELS: Record<EvidenceLevel, string> = {
  official:   "Official Docs",
  reproduced: "Reproduced",
  incident:   "Incident Report",
  community:  "Community",
};

export function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#EFF6FF] text-[#3B82F6] border border-[#BFDBFE]">
      {EVIDENCE_LABELS[level]}
    </span>
  );
}

// ── Copy Button ───────────────────────────────────────────────────────────────
export function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    try { await navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { /* fallback */ }
  };
  return (
    <button
      onClick={handleCopy}
      className={clsx(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-all",
        copied
          ? "bg-[#ECFDF5] text-[#059669] border border-[#A7F3D0]"
          : "bg-white text-[#555B66] border border-[#E5E7EB] hover:text-[#3B82F6] hover:border-[#3B82F6]/40",
        className
      )}
      aria-label={copied ? "Copied!" : "Copy to clipboard"}
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

// ── Code Block ────────────────────────────────────────────────────────────────
export function CodeBlock({ code, language = "bash" }: { code: string; language?: string }) {
  return (
    <div className="relative group rounded-lg bg-[#1E293B] border border-[#334155] overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#334155]">
        <span className="text-xs text-[#94A3B8] font-mono">{language}</span>
        <CopyButton text={code} />
      </div>
      <pre className="px-4 py-3 text-sm text-[#E2E8F0] font-mono overflow-x-auto leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────
export function EmptyState({ title, description, action }: { title: string; description: string; action?: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-12 h-12 rounded-full bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-center mb-4">
        <Info className="w-5 h-5 text-[#9CA3AF]" />
      </div>
      <h3 className="text-base font-semibold text-[#111111] mb-1">{title}</h3>
      <p className="text-sm text-[#555B66] max-w-sm mb-4">{description}</p>
      {action}
    </div>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────
export function SectionCard({ title, icon, children, className }: { title: string; icon?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={clsx("rounded-xl border border-[#E5E7EB] bg-white overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.08)]", className)}>
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-[#F3F4F6] bg-[#F8FAFC]">
        {icon && <span className="text-[#3B82F6]">{icon}</span>}
        <h2 className="text-sm font-semibold text-[#111111]">{title}</h2>
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}

// ── Last Verified ─────────────────────────────────────────────────────────────
export function LastVerified({ date }: { date: string }) {
  const [isStale, setIsStale] = useState(false);

  useEffect(() => {
    const d = new Date(date);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
    setIsStale(diffDays > 180);
  }, [date]);

  const [year, month, day] = date.split("-").map(Number);
  const formattedDate = !isNaN(year) && !isNaN(month) && !isNaN(day)
    ? new Date(Date.UTC(year, month - 1, day)).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC",
      })
    : date;

  return (
    <span className={clsx("inline-flex items-center gap-1 text-xs", isStale ? "text-[#D97706]" : "text-[#9CA3AF]")}>
      <Clock className="w-3 h-3" />
      Verified {formattedDate}
      {isStale && " · May be outdated"}
    </span>
  );
}
