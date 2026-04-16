const statusMap = {
  in_transit:{ label:'In Transit', tag:'bg-accent-dim text-accent',   bar:'bg-accent'   },
  delayed:   { label:'Delayed',    tag:'bg-yellow-dim text-yellow',  bar:'bg-yellow' },
  at_risk:   { label:'At Risk',    tag:'bg-red-dim text-red',     bar:'bg-red'    },
  rerouted:  { label:'Rerouted',   tag:'bg-gray-500/15 text-muted',    bar:'bg-green'  },
};

export default function ShipmentList({ shipments }) {
  return (
    <div className="flex flex-col">
      {shipments.map(s => {
        const c = statusMap[s.status];
        return (
          <div key={s.id} className="grid grid-cols-[1fr_90px_auto_56px] items-center gap-3.5 px-5 py-[13px] border-b border-border transition-colors cursor-pointer hover:bg-surface2 last:border-b-0">
            <div>
              <div className="font-mono text-[11.5px] text-accent font-medium">{s.id}</div>
              <div className="text-[13px] font-medium mt-0.5">{s.route}</div>
              <div className="text-[11.5px] text-muted mt-0.5">{s.loc}</div>
            </div>
            <div>
              <div className="text-[11px] text-muted mb-1">{s.progress}%</div>
              <div className="bg-surface2 rounded h-[3px] overflow-hidden">
                <div className={`h-full rounded transition-all duration-1000 ease-out ${c.bar}`} style={{ width: `${s.progress}%` }}></div>
              </div>
            </div>
            <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${c.tag}`}>
              {c.label}
            </span>
            <div className="text-[11.5px] text-muted font-mono text-right">{s.eta}</div>
          </div>
        );
      })}
    </div>
  );
}
