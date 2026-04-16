export default function KPICard({ label, value, deltaStr, deltaType, icon, colorClass, delayClass }) {
  const isBlue = colorClass === 'blue';
  const isGreen = colorClass === 'green';
  const isYellow = colorClass === 'yellow';
  const isRed = colorClass === 'red';

  const beforeClasses = `absolute top-0 left-0 right-0 h-[2px] rounded-t-sm ${isBlue ? 'bg-accent' : isGreen ? 'bg-green' : isYellow ? 'bg-yellow' : isRed ? 'bg-red' : ''}`;
  
  const deltaColorClass = 
    deltaType === 'up' ? 'bg-green-dim text-green' : 
    deltaType === 'down' ? 'bg-red-dim text-red' : 
    'bg-yellow-dim text-yellow';

  return (
    <div className={`bg-surface border border-border rounded-[14px] p-5 pt-5 pb-4 relative overflow-hidden transition-colors hover:border-white/15 fade-up ${delayClass || ''}`}>
      <div className={beforeClasses}></div>
      <div className="text-[11px] text-muted font-medium uppercase tracking-wider mb-2.5">
        {label}
      </div>
      <div className="text-[28px] font-semibold tracking-tight leading-none mb-2">
        {value}
      </div>
      <div className={`inline-flex items-center gap-1 text-[11px] font-medium px-2.5 py-1 rounded-full ${deltaColorClass}`}>
        {deltaStr}
      </div>
      <div className="absolute top-[18px] right-4 text-xl opacity-20">
        {icon}
      </div>
    </div>
  );
}
