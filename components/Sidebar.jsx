import { Zap, Package, Map as MapIcon, Bot, BarChart3, Bell, Settings, FileText, LayoutDashboard } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-[220px] bg-surface border-r border-border p-7 flex flex-col gap-8 sticky top-0 h-screen overflow-hidden max-md:hidden">
      <div className="flex items-center gap-2.5 font-semibold text-[15px] tracking-tight">
        <div className="w-[34px] h-[34px] bg-accent rounded-lg flex items-center justify-center text-white text-base shrink-0">
          ⛓
        </div>
        ChainGuard AI
      </div>

      <nav className="flex flex-col gap-0.5">
        <div className="text-[10px] font-semibold tracking-widest uppercase text-muted mb-2 px-2.5">Monitor</div>
        <NavItem active icon={<LayoutDashboard size={16} />} label="Overview" />
        <NavItem icon={<Package size={16} />} label="Shipments" />
        <NavItem icon={<Zap size={16} />} label="Disruptions" />
        <NavItem icon={<MapIcon size={16} />} label="Routes" />
      </nav>

      <nav className="flex flex-col gap-0.5">
        <div className="text-[10px] font-semibold tracking-widest uppercase text-muted mb-2 px-2.5">Intelligence</div>
        <NavItem icon={<Bot size={16} />} label="AI Predictions" />
        <NavItem icon={<BarChart3 size={16} />} label="Analytics" />
        <NavItem icon={<Bell size={16} />} label="Alerts" badge="3" />
      </nav>

      <nav className="flex flex-col gap-0.5">
        <div className="text-[10px] font-semibold tracking-widest uppercase text-muted mb-2 px-2.5">System</div>
        <NavItem icon={<Settings size={16} />} label="Settings" />
        <NavItem icon={<FileText size={16} />} label="Reports" />
      </nav>

      <div className="mt-auto p-3 bg-surface2 rounded w-full flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">
          AK
        </div>
        <div>
          <div className="text-[13px] font-medium leading-tight">Aryan Kumar</div>
          <div className="text-[11px] text-muted leading-tight mt-0.5">Supply Chain Lead</div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, badge }) {
  return (
    <div className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors text-[13.5px] font-medium ${active ? 'bg-accent-dim text-accent' : 'text-muted hover:bg-surface2 hover:text-text'}`}>
      <div className="w-[18px] flex items-center justify-center opacity-90">{icon}</div>
      <span className="flex-1">{label}</span>
      {badge && <span className="bg-red-dim text-red px-2 py-0.5 rounded-full text-[10px] font-semibold leading-none flex items-center">{badge}</span>}
    </div>
  );
}
