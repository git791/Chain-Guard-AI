"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import KPICard from "@/components/KPICard";
import ShipmentList from "@/components/ShipmentList";
import DisruptionList from "@/components/DisruptionList";
import Chart from "@/components/Chart";
import Map from "@/components/Map";
import AIInsights from "@/components/AIInsights";
import RiskStrip from "@/components/RiskStrip";
import { useShipments } from "@/hooks/useShipments";

const INITIAL_DISRUPTIONS = [
  { icon:'🌧', title:'Heavy Rainfall — NH-48',         desc:'Cyclonic conditions near Surat. 4 shipments affected.',             time:'12 min ago', sev:'high'   },
  { icon:'🚧', title:'Road Closure — Jaipur Bypass',   desc:'Unplanned maintenance. Alternate route via SH-8 recommended.',     time:'34 min ago', sev:'medium' },
  { icon:'🏭', title:'Port Congestion — JNPT',         desc:'Berth availability down 40%. Expected 6h delay.',                  time:'1h 20m ago', sev:'medium' },
];

const AI_FIXTURES = [
  { color:'var(--color-red)',    text:'<strong>High risk:</strong> SHP-2956 likely to miss ETA by 3–5h due to weather system near Rajasthan.' },
  { color:'var(--color-yellow)', text:'<strong>Reroute ready:</strong> Diverting 3 shipments from NH-48 via inland saves avg. 4.2h.' },
  { color:'var(--color-accent)', text:'<strong>Demand spike:</strong> Elevated volume expected in NCR corridor tomorrow. Pre-position carriers.' },
  { color:'var(--color-green)',  text:'<strong>Optimization:</strong> Consolidating SHP-6140 & SHP-7703 reduces cost by ₹18,400.' },
];

import { useAuth } from "@/lib/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const { shipments, loading: shipmentsLoading } = useShipments();
  const [disruptions, setDisruptions] = useState(INITIAL_DISRUPTIONS);
  const [aiInsights, setAiInsights] = useState(AI_FIXTURES);
  const [insightsLoading, setInsightsLoading] = useState(false);
  
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  // KPIs state (for simulation if needed)
  const [kpis, setKpis] = useState({ active: 142, delayed: 17, risk: 9, onTime: 88 });

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="flex items-center gap-2.5 font-semibold text-lg tracking-tight justify-center text-text animate-pulse">
          <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center text-white text-base shadow-[0_0_15px_rgba(79,156,249,0.3)]">⛓</div>
          Preparing Command Center...
        </div>
      </div>
    );
  }

  const handleRefresh = () => {
    setKpis({
      active: 140 + Math.floor(Math.random() * 6),
      delayed: 14 + Math.floor(Math.random() * 6),
      risk: 7 + Math.floor(Math.random() * 4),
      onTime: 86 + Math.floor(Math.random() * 5),
    });
  };

  const handleNewAlert = () => {
    setDisruptions(prev => {
      const updated = [{ 
        icon:'🔴', title:'Customs Hold — Nhava Sheva', 
        desc:'Documentation mismatch on 2 containers. 8–12h delay estimated.', 
        time:'Just now', sev:'high', flash: true 
      }, ...prev];
      if (updated.length > 4) updated.pop();
      return updated;
    });
  };

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] min-h-screen max-md:grid-cols-1">
      <Sidebar />
      <div className="flex flex-col min-h-0 bg-bg">
        <Header onRefresh={handleRefresh} onNewAlert={handleNewAlert} />
        
        <main className="p-8 flex flex-col gap-6 max-md:p-4.5">
          {/* KPIs */}
          <div className="grid grid-cols-4 gap-3.5 max-[1100px]:grid-cols-2 max-md:grid-cols-2">
            <KPICard label="Active Shipments" value={kpis.active} deltaStr="↑ 8 today" deltaType="up" icon="📦" colorClass="blue" />
            <KPICard label="Delayed" value={kpis.delayed} deltaStr="↑ 3 new" deltaType="down" icon="⏱" colorClass="yellow" delayClass="[animation-delay:0.05s]" />
            <KPICard label="At Risk" value={kpis.risk} deltaStr="→ No change" deltaType="neutral" icon="⚠️" colorClass="red" delayClass="[animation-delay:0.1s]" />
            <KPICard label="On-Time Rate" value={`${kpis.onTime}%`} deltaStr="↑ 2% vs yesterday" deltaType="up" icon="✅" colorClass="green" delayClass="[animation-delay:0.15s]" />
          </div>

          <div className="grid grid-cols-[2fr_1fr] gap-3.5 fade-up [animation-delay:0.2s] max-[1100px]:grid-cols-1">
            <div className="bg-surface border border-border rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between p-4 px-5 border-b border-border">
                <div>
                  <h2 className="text-[13.5px] font-semibold">Active Shipments</h2>
                  <p className="text-[11.5px] text-muted mt-0.5">Live transit tracking</p>
                </div>
                <span className="inline-flex items-center px-[9px] py-[3px] rounded-full text-[11px] font-semibold bg-accent-dim text-accent">
                  142 total
                </span>
              </div>
              <ShipmentList shipments={shipments} />
            </div>

            <div className="bg-surface border border-border rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between p-4 px-5 border-b border-border">
                <div>
                  <h2 className="text-[13.5px] font-semibold">Disruptions</h2>
                  <p className="text-[11.5px] text-muted mt-0.5">Active alerts</p>
                </div>
                <span className="inline-flex items-center px-[9px] py-[3px] rounded-full text-[11px] font-semibold bg-red-dim text-red">
                  {disruptions.length} active
                </span>
              </div>
              <DisruptionList disruptions={disruptions} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3.5 max-[1100px]:grid-cols-1">
            <div className="bg-surface border border-border rounded-[14px] overflow-hidden">
              <div className="flex items-center justify-between p-4 px-5 border-b border-border">
                <div>
                  <h2 className="text-[13.5px] font-semibold">Delay Trend</h2>
                  <p className="text-[11.5px] text-muted mt-0.5">Last 7 days</p>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="flex items-center gap-[5px] text-[11px] text-muted">
                    <span className="w-[10px] h-[2px] bg-accent inline-block rounded-sm"></span>On-time
                  </span>
                  <span className="flex items-center gap-[5px] text-[11px] text-muted">
                    <span className="w-[10px] h-[2px] bg-red inline-block rounded-sm"></span>Delayed
                  </span>
                </div>
              </div>
              <div className="p-4 px-5 pb-[18px]">
                <Chart />
              </div>
              <div className="m-0 mx-[18px] mb-[18px] rounded-lg bg-surface2 border border-border overflow-hidden relative h-[160px]">
                <Map shipments={shipments} />
                <div className="absolute bottom-3 left-3 flex gap-1.5 z-10">
                  <div className="px-[9px] py-[3px] bg-[#0d1016cc] text-accent border border-border backdrop-blur-md rounded-full text-[10.5px] font-medium">
                    ● Active: 12
                  </div>
                  <div className="px-[9px] py-[3px] bg-[#0d1016cc] text-yellow border border-border backdrop-blur-md rounded-full text-[10.5px] font-medium">
                    ● Risk Zones: 3
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-surface border border-border rounded-[14px] overflow-hidden flex flex-col">
              <div className="flex items-center justify-between p-4 px-5 border-b border-border">
                <div>
                  <h2 className="text-[13.5px] font-semibold">AI Insights</h2>
                  <p className="text-[11.5px] text-muted mt-0.5">Gemini-powered predictions</p>
                </div>
                {insightsLoading ? (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-green-dim border border-green/20 rounded-full text-green text-[10.5px] font-medium">
                    <div className="w-1.5 h-1.5 bg-green rounded-full pulse-dot-anim"></div>
                    Analyzing
                  </div>
                ) : (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-surface2 border border-border rounded-full text-muted text-[10.5px] font-medium">
                    Updated
                  </div>
                )}
              </div>
              <AIInsights insights={aiInsights} loading={insightsLoading} />
            </div>
          </div>

          <RiskStrip />
          
        </main>
      </div>
    </div>
  );
}
