// /components/StatCard.tsx

export default function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white shadow-md rounded-2xl p-8 min-h-[160px] flex flex-col justify-between">
      <div className="text-gray-600 text-base">{label}</div>
      <div className="text-5xl font-bold text-[#0CB2D4] mt-4">{value}</div>
    </div>
  );
}
