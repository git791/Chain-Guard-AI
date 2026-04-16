const chartData = [
  {day:'Mon',d:8, o:28},{day:'Tue',d:12,o:24},{day:'Wed',d:6, o:31},
  {day:'Thu',d:14,o:22},{day:'Fri',d:9, o:29},{day:'Sat',d:17,o:20},{day:'Sun',d:11,o:26},
];

export default function Chart() {
  const max = Math.max(...chartData.map(d => d.d + d.o));

  return (
    <div className="flex items-end gap-[5px] h-[56px]">
      {chartData.map((d, i) => {
        const oH = Math.round((d.o / max) * 52);
        const dH = Math.round((d.d / max) * 52);
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-[5px]">
            <div className="flex items-end gap-[2px] h-[56px] w-full group">
              <div 
                className="w-full rounded-t-[3px] cursor-pointer transition-opacity opacity-80 group-hover:opacity-100 bg-accent" 
                style={{ height: `${oH}px` }} 
                title={`On-time: ${d.o}`}
              ></div>
              <div 
                className="w-full rounded-t-[3px] cursor-pointer transition-opacity opacity-80 group-hover:opacity-100 bg-red" 
                style={{ height: `${dH}px` }} 
                title={`Delayed: ${d.d}`}
              ></div>
            </div>
            <div className="text-[10px] text-muted">{d.day}</div>
          </div>
        );
      })}
    </div>
  );
}
