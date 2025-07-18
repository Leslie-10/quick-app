// /components/AdminHeader.tsx
export default function AdminHeader() {
  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <div className="text-lg font-semibold text-[#0CB2D4]">Tableau de bord</div>
      <div className="text-sm text-gray-500">Connecté en tant qu'Administrateur</div>
    </header>
  );
}
