export default function RiskStrip() {
  return (
    <div className="grid grid-cols-3 gap-3.5 max-lg:grid-cols-2 max-md:grid-cols-1">
      <RiskCard icon="🌦" label="Weather Risk" value="Medium" color="yellow" progress={55} />
      <RiskCard icon="🛣" label="Traffic Risk" value="Low" color="green" progress={28} />
      <RiskCard icon="⚙️" label="Operational Risk" value="High" color="red" progress={78} />
    </div>
  );
}

function RiskCard({ icon, label, value, color, progress }) {
  const cMap = {
    yellow: { bg: 'bg-yellow-dim', text: 'text-yellow', bar: 'bg-yellow' },
    green: { bg: 'bg-green-dim', text: 'text-green', bar: 'bg-green' },
    red: { bg: 'bg-red-dim', text: 'text-red', bar: 'bg-red' },
  };
  const c = cMap[color];

  return (
    <div className="bg-surface border border-border rounded-[14px] p-4 px-[18px] flex items-center gap-3">
      <div className={`w-[38px] h-[38px] rounded-lg flex items-center justify-center text-lg shrink-0 ${c.bg}`}>
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-[11.5px] text-muted">{label}</div>
        <div className={`text-base font-semibold tracking-tight ${c.text}`}>{value}</div>
        <div className="mt-1">
          <div className="bg-surface2 rounded h-[3px] overflow-hidden">
            <div className={`h-full rounded ${c.bar}`} style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
