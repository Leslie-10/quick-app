"use client";

import { useEffect, useState } from "react";

interface Utilisateur {
  id: number;
  nom: string;
  email: string;
  telephone: string;
  ville: string;
  quartier: string;
  creeLe: string;
}

export default function AdminUtilisateursPage() {
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUtilisateurs = async () => {
    try {
      const res = await fetch("/api/admin/utilisateurs");
      const data = await res.json();
      setUtilisateurs(data);
    } catch (error) {
      console.error("Erreur chargement utilisateurs :", error);
    } finally {
      setLoading(false);
    }
  };

  const supprimerUtilisateur = async (id: number) => {
    if (!confirm("Supprimer définitivement cet utilisateur ?")) return;

    try {
      const res = await fetch(`/api/admin/utilisateurs?id=${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setUtilisateurs((prev) => prev.filter((u) => u.id !== id));
      } else {
        const err = await res.json();
        alert("Erreur : " + err.message);
      }
    } catch (error) {
      alert("Erreur lors de la suppression.");
    }
  };

  useEffect(() => {
    fetchUtilisateurs();
  }, []);

  if (loading) return <p className="text-center py-10">Chargement...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0CB2D4] mb-6">👥 Utilisateurs enregistrés</h1>

      {utilisateurs.length === 0 ? (
        <p className="text-gray-600">Aucun utilisateur trouvé.</p>
      ) : (
        <div className="space-y-4">
          {utilisateurs.map((u) => (
            <div
              key={u.id}
              className="bg-white border p-4 rounded-xl shadow flex flex-col md:flex-row md:items-center md:justify-between gap-3"
            >
              <div>
                <p className="font-semibold text-lg text-[#0CB2D4]">{u.nom}</p>
                <p className="text-sm text-gray-600">{u.email} - {u.telephone}</p>
                <p className="text-sm text-gray-500">
                  📍 {u.ville}, {u.quartier} – inscrit le{" "}
                  {new Date(u.creeLe).toLocaleDateString()}
                </p>
              </div>

              <button
                onClick={() => supprimerUtilisateur(u.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600 text-sm"
              >
                Supprimer
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
