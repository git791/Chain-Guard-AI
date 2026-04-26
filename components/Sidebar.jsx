import { Map as MapIcon, BarChart3, Settings, LayoutDashboard } from "lucide-react";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useAuth();

  // Get initials for avatar
  const initials = profile?.name ? profile.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'AK';

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
        <NavItem href="/" active={pathname === '/'} icon={<LayoutDashboard size={16} />} label="Dashboard" />
        <NavItem href="/routes" active={pathname === '/routes'} icon={<MapIcon size={16} />} label="Routes" />
      </nav>

      <nav className="flex flex-col gap-0.5">
        <div className="text-[10px] font-semibold tracking-widest uppercase text-muted mb-2 px-2.5">Intelligence</div>
        <NavItem href="/analytics" active={pathname === '/analytics'} icon={<BarChart3 size={16} />} label="Analytics" />
      </nav>

      <nav className="flex flex-col gap-0.5">
        <div className="text-[10px] font-semibold tracking-widest uppercase text-muted mb-2 px-2.5">System</div>
        <NavItem href="/settings" active={pathname === '/settings'} icon={<Settings size={16} />} label="Settings" />
      </nav>

      <div className="mt-auto p-3 bg-surface2 rounded w-full flex items-center gap-2.5">
        <div className="w-[30px] h-[30px] bg-gradient-to-br from-accent to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-semibold shrink-0">
          {initials}
        </div>
        <div>
          <div className="text-[13px] font-medium leading-tight truncate max-w-[120px]">{profile?.name || "Aryan Kumar"}</div>
          <div className="text-[11px] text-muted leading-tight mt-0.5 truncate max-w-[120px]">{profile?.role || "Logistics Manager"}</div>
        </div>
      </div>
    </aside>
  );
}

function NavItem({ icon, label, active, badge, href }) {
  return (
    <Link href={href} className={`flex items-center gap-2.5 px-3 py-2 rounded-md cursor-pointer transition-colors text-[13.5px] font-medium ${active ? 'bg-accent-dim text-accent' : 'text-muted hover:bg-surface2 hover:text-text'}`}>
      <div className="w-[18px] flex items-center justify-center opacity-90">{icon}</div>
      <span className="flex-1">{label}</span>
      {badge && <span className="bg-red-dim text-red px-2 py-0.5 rounded-full text-[10px] font-semibold leading-none flex items-center">{badge}</span>}
    </Link>
  );
}
