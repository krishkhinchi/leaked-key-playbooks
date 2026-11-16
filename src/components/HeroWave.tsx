"use client";
import { useEffect, useRef } from "react";

export default function HeroWave() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let t = 0;
    let W = 0, H = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    // Dot grid parameters
    const COLS = 52;
    const ROWS = 28;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      t += 0.006;

      const colGap = W / (COLS - 1);
      const rowGap = H / (ROWS - 1);

      for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
          const x = c * colGap;

          // Multi-layer wave displacement
          const wave1 = Math.sin(c * 0.28 + t * 1.1 + r * 0.45) * 22;
          const wave2 = Math.sin(c * 0.14 + t * 0.65 + r * 0.22) * 14;
          const wave3 = Math.sin(c * 0.42 + t * 1.6 + r * 0.7) * 8;
          const y = r * rowGap + wave1 + wave2 + wave3;

          // Depth: dots further back (higher rows) are smaller and lighter
          const depthFactor = 0.3 + (r / ROWS) * 0.7;

          // Brightness pulse per dot
          const pulse = Math.sin(c * 0.55 + r * 0.7 + t * 1.8);
          const brightness = (pulse + 1) / 2; // 0..1

          // Dot size: 0.8px to 3.5px
          const radius = (0.8 + brightness * 2.2) * depthFactor;

          // Opacity: 0.08 to 0.65
          const alpha = (0.08 + brightness * 0.57) * depthFactor;

          // Color: mix between light blue (#93C5FD) and medium blue (#3B82F6)
          const r_ch = Math.round(147 + (59 - 147) * brightness);
          const g_ch = Math.round(197 + (130 - 197) * brightness);
          const b_ch = Math.round(253 + (246 - 253) * brightness);

          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r_ch},${g_ch},${b_ch},${alpha})`;
          ctx.fill();

          // Occasional bright highlight dot
          if (brightness > 0.82 && depthFactor > 0.6) {
            const glowR = radius * 2.5;
            const grad = ctx.createRadialGradient(x, y, 0, x, y, glowR);
            grad.addColorStop(0, `rgba(96,165,250,${alpha * 0.5})`);
            grad.addColorStop(1, "rgba(96,165,250,0)");
            ctx.beginPath();
            ctx.arc(x, y, glowR, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      t = 2;
      draw();
      cancelAnimationFrame(animId!);
    } else {
      draw();
    }

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
}
