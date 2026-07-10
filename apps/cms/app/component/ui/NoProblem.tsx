export default function NoProblems() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 py-20">
      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl">
        {"{}"}
      </div>
      <div className="flex flex-col items-center gap-1">
        <h2 className="text-white text-sm font-medium">No problems found</h2>
        <p className="text-white/30 text-xs text-center max-w-[220px] leading-relaxed">
          No problems match your current filters or the database is empty.
        </p>
      </div>
      <button
        onClick={() => window.location.reload()}
        className="mt-2 px-4 py-1.5 text-xs text-[#ffa116] border border-[#ffa116]/30 rounded-lg hover:bg-[#ffa116]/10 transition-colors"
      >
        ↺ Refresh
      </button>
    </div>
  );
}