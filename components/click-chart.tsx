"use client";

interface Props {
  data: { date: string; count: number }[];
}

export default function ClickChart({ data }: Props) {
  if (data.length === 0) return <p className="text-sm text-neutral-500 text-center py-8">No click data yet.</p>;

  const maxCount = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="flex items-end gap-2 h-32">
      {data.slice(-14).map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-neutral-600">{d.count}</span>
          <div
            className="w-full bg-blue-500 rounded-t hover:bg-blue-600 transition cursor-pointer min-h-[4px]"
            style={{ height: `${(d.count / maxCount) * 100}%` }}
          />
          <span className="text-[8px] text-neutral-400 truncate w-full text-center">{d.date.slice(5)}</span>
        </div>
      ))}
    </div>
  );
}
