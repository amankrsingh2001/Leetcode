"use client";
import { useEffect, useState } from "react";

const terminalLines = [
  { delay: 200,  text: "$ initializing judge environment", type: "prompt" },
  { delay: 700,  text: "✓ database connected", type: "success" },
  { delay: 1100, text: "$ loading problem set", type: "prompt" },
  { delay: 1600, text: "→ fetched 150 problems", type: "info" },
  { delay: 2000, text: "$ compiling sandbox runtime", type: "prompt" },
  { delay: 2600, text: "✓ v8 isolate ready", type: "success" },
  { delay: 3100, text: "⚡ turbo mode enabled", type: "warn" },
  { delay: 3500, text: "✓ all systems go", type: "success", cursor: true },
];

const typeColor: Record<string, string> = {
  prompt: "text-[#ffa116]",
  success: "text-[#28c840]",
  info: "text-[#5ac8fa]",
  warn: "text-[#febc2e]",
};

export default function LoadingSkeleton() {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [progs, setProgs] = useState({ p1: 0, p2: 0, p3: 0 });
  const [stats, setStats] = useState({ s1: 0, s2: 0, s3: 0, s4: 1000 });
  const [dots, setDots] = useState("...");

  useEffect(() => {
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleLines((prev) => [...prev, i]), line.delay);
    });

    const animateProg = (key: "p1" | "p2" | "p3", target: number, duration: number, delay: number) => {
      setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setProgs((prev) => ({ ...prev, [key]: Math.round(t * target) }));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, delay);
    };

    animateProg("p1", 100, 1800, 400);
    animateProg("p2", 100, 2200, 700);
    animateProg("p3", 100, 1600, 1100);

    const animateStat = (key: "s1" | "s2" | "s3" | "s4", target: number, duration: number, delay: number) => {
      setTimeout(() => {
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          setStats((prev) => ({ ...prev, [key]: Math.round(key === "s4" ? 1000 - t * 731 : t * target) }));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }, delay);
    };

    animateStat("s1", 150, 1500, 500);
    animateStat("s2", 42, 1500, 700);
    animateStat("s3", 7, 1000, 900);
    animateStat("s4", 731, 1200, 800);

    const dotsInterval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 400);

    return () => clearInterval(dotsInterval);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a1a] flex flex-col items-center justify-center gap-8 px-4 py-10 font-mono">

      {/* Logo */}
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-[#ffa116] rounded-lg flex items-center justify-center">
          <span className="text-[#1a1a1a] text-lg font-bold">{"{}"}</span>
        </div>
        <span className="text-white text-xl font-medium font-sans">
          Code<span className="text-[#ffa116]">Judge</span>
        </span>
      </div>

      {/* Terminal */}
      <div className="w-full max-w-[480px] bg-[#0d0d0d] rounded-xl border border-white/10 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#161616] border-b border-white/5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
          <span className="ml-2 text-[11px] text-white/20">judge@codejudge ~ initializing</span>
        </div>
        <div className="p-4 flex flex-col gap-2 min-h-[130px]">
          {terminalLines.map((line, i) =>
            visibleLines.includes(i) ? (
              <div key={i} className={`text-xs flex items-center gap-2 ${typeColor[line.type]} animate-fade-in`}>
                <span>{line.text}</span>
                {line.cursor && (
                  <span className="inline-block w-1.5 h-3.5 bg-[#ffa116] rounded-sm animate-pulse" />
                )}
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* Progress Bars */}
      <div className="w-full max-w-[480px] flex flex-col gap-3">
        {[
          { label: "Loading problems", val: progs.p1, color: "bg-[#ffa116]" },
          { label: "Fetching test cases", val: progs.p2, color: "bg-[#5ac8fa]" },
          { label: "Compiling sandbox", val: progs.p3, color: "bg-[#28c840]" },
        ].map(({ label, val, color }) => (
          <div key={label} className="flex flex-col gap-1.5">
            <div className="flex justify-between text-[11px] text-white/40">
              <span>{label}</span>
              <span>{val}%</span>
            </div>
            <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-100 ${color}`}
                style={{ width: `${val}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="w-full max-w-[480px] grid grid-cols-4 gap-2.5">
        {[
          { label: "Problems", val: stats.s1, color: "text-white" },
          { label: "Solved", val: stats.s2, color: "text-[#28c840]" },
          { label: "Streak", val: stats.s3, color: "text-[#ffa116]" },
          { label: "Rank", val: `#${stats.s4}`, color: "text-[#ff5f57]" },
        ].map(({ label, val, color }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="text-[10px] text-white/30 uppercase tracking-wider mb-1">{label}</div>
            <div className={`text-lg font-medium ${color}`}>{val}</div>
          </div>
        ))}
      </div>

      {/* Spinner */}
      <div className="flex items-center gap-2.5">
        <div className="w-4 h-4 border-2 border-[#ffa116]/20 border-t-[#ffa116] rounded-full animate-spin" />
        <span className="text-xs text-white/30">Preparing your workspace{dots}</span>
      </div>

    </div>
  );
}