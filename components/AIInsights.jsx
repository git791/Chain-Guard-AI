export default function AIInsights({ insights, loading }) {
  if (loading) {
    return (
      <div className="flex flex-col gap-2.5 px-[18px] py-[14px]">
        <div className="animate-pulse bg-surface2 h-[60px] rounded-md"></div>
        <div className="animate-pulse bg-surface2 h-[60px] rounded-md"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-[9px] px-[18px] py-[14px]">
      {insights.map((a, i) => (
        <div key={i} className="flex items-start gap-2.5 p-2.5 px-3 bg-surface2 rounded-md">
          <div className="w-[7px] h-[7px] rounded-full mt-[5px] shrink-0" style={{ background: a.color }}></div>
          {/* dangerouslySetInnerHTML is used here as the payload contains raw HTML `<strong>` for styling */}
          <div className="text-[12.5px] leading-[1.5] text-[#b0b6c3] [&>strong]:text-text" dangerouslySetInnerHTML={{ __html: a.text }}></div>
        </div>
      ))}
    </div>
  );
}
