export default function DisruptionList({ disruptions }) {
  return (
    <div className="flex flex-col gap-2.5 px-[18px] py-[14px]">
      {disruptions.map((d, i) => {
        const bColor = d.sev === 'high' ? 'border-red' : d.sev === 'medium' ? 'border-yellow' : 'border-green';
        return (
          <div key={i} className={`flex items-start gap-[11px] p-[11px] px-3 bg-surface2 rounded-md border-l-2 transition-transform hover:translate-x-0.5 ${bColor} ${d.flash ? 'flash-anim' : ''}`}>
            <div className="text-base shrink-0 mt-px">{d.icon}</div>
            <div>
              <div className="text-[12.5px] font-semibold">{d.title}</div>
              <div className="text-[11.5px] text-muted mt-0.5 leading-[1.4]">{d.desc}</div>
              <div className="text-[10.5px] text-muted mt-1 font-mono">{d.time}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
