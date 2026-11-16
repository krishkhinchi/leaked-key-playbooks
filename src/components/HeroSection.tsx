"use client";
import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { useEffect, useState } from "react";
import HeroWave from "./HeroWave";

export default function HeroSection({ playbookCount }: { playbookCount: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 40); return () => clearTimeout(id); }, []);

  return (
    <section
      className="relative overflow-hidden bg-white min-h-[calc(100vh-4rem)] flex items-center"
      aria-label="Hero"
    >
      {/* Dot wave — full section, clipped to bottom-right quadrant via gradient mask */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          maskImage: "linear-gradient(to top left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 70%)",
          WebkitMaskImage: "linear-gradient(to top left, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0) 70%)",
        }}
        aria-hidden
      >
        <HeroWave />
      </div>

      {/* Very subtle top-left radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 70% at -5% 50%, rgba(234,242,255,0.6) 0%, transparent 65%)" }}
        aria-hidden
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="max-w-2xl lg:max-w-3xl">
          {/* Main heading */}
          <h1 className={clsx(
            "anim-2 font-bold leading-[1.06] tracking-[-0.02em] mb-0",
            "text-[clamp(2.6rem,5.5vw,5rem)]",
            !mounted && "opacity-0"
          )}>
            <span className="text-[#111111]">AI secure </span>
            <span className="text-[#6495ED]">access</span>
            <span className="text-[#111111]"> to your<br className="hidden sm:block" /> data, anywhere, </span>
            <span className="text-[#6495ED]">anytime</span>
          </h1>

          {/* Description */}
          <p className={clsx(
            "anim-3 text-[1.05rem] sm:text-lg text-[#555B66] leading-[1.7] mb-10 max-w-xl",
            !mounted && "opacity-0"
          )}>
            Enable remote teams with secure access, strong identity checks, and safe tools to work from anywhere.
          </p>

          {/* CTA buttons */}
          <div className={clsx("anim-4 flex flex-col sm:flex-row items-start gap-3 mb-16", !mounted && "opacity-0")}>
            <Link
              href="/playbooks"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-[#3B82F6] text-white font-semibold text-sm transition-all duration-200 hover:bg-[#2563EB] hover:shadow-[0_4px_14px_rgba(59,130,246,0.4)] active:scale-[0.98]"
            >
              GET STARTED
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/response-guide"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-[#E5E7EB] bg-white text-[#374151] font-semibold text-sm transition-all duration-200 hover:border-[#3B82F6]/50 hover:text-[#3B82F6] hover:bg-[#F8FAFC] shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
            >
              VIEW DOCS
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// inline clsx to avoid extra import
function clsx(...args: (string | boolean | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
