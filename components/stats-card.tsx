interface Props {
  label: string;
  value: string | number;
  color?: string;
}

export default function StatsCard({ label, value, color = "bg-black" }: Props) {
  return (
    <div className="border rounded-2xl bg-white p-6 shadow-xs space-y-2 hover:shadow-md transition">
      <span className="text-sm font-medium text-neutral-500">{label}</span>
      <p className={`text-4xl font-extrabold tracking-tight`}>{value}</p>
      <div className={`h-1 w-12 rounded-full ${color}`} />
    </div>
  );
}
