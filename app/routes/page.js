"use client";

import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import Map from "@/components/Map";
import { useShipments } from "@/hooks/useShipments";

export default function RoutesPage() {
  const { shipments } = useShipments();

  return (
    <div className="grid grid-cols-[220px_1fr] grid-rows-[auto_1fr] min-h-screen max-md:grid-cols-1">
      <Sidebar />
      <div className="flex flex-col min-h-0 bg-[var(--color-bg)]">
        <Header />
        <main className="p-8 flex flex-col gap-6 max-md:p-4.5 h-full">
          <h1 className="text-2xl font-bold">Live Routes</h1>
          <p className="text-muted text-sm -mt-4 mb-2">Track real-time shipment movements across the supply chain.</p>
          <div className="flex-1 rounded-[14px] overflow-hidden border border-border bg-surface relative min-h-[500px]">
            <Map shipments={shipments} />
          </div>
        </main>
      </div>
    </div>
  );
}
