// /app/admin/page.tsx
import StatCard from "@/components/StatCard";

export default function AdminDashboard() {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-[#0CB2D4]">Vue générale</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard label="Prestataires en attente" value="12" />
        <StatCard label="Candidatures reçues" value="34" />
        <StatCard label="Annonces publiées" value="78" />
      </div>
    </div>
  );
}
