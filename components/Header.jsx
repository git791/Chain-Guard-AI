export default function Header({ onRefresh, onNewAlert }) {
  return (
    <header className="px-8 py-5 border-b border-border flex items-center justify-between bg-bg sticky top-0 z-10 max-md:p-4">
      <div>
        <h1 className="text-lg font-semibold tracking-tight leading-tight">Overview</h1>
        <p className="text-xs text-muted mt-0.5">Real-time supply chain intelligence · Updated just now</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-dim border border-green/20 rounded-full text-green text-xs font-medium">
          <div className="w-1.5 h-1.5 bg-green rounded-full pulse-dot-anim"></div>
          Live
        </div>
        <button onClick={onRefresh} className="px-4 py-2 rounded text-[13px] font-medium transition-colors bg-surface2 text-text border border-border hover:border-white/15">
          ↻ Refresh
        </button>
        <button onClick={onNewAlert} className="px-4 py-2 rounded text-[13px] font-medium transition-colors bg-accent text-white hover:bg-blue-600 border border-transparent">
          + New Alert
        </button>
      </div>
    </header>
  );
}
