// /app/admin/prestataires/page.tsx
"use client";

import { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";

interface Prestataire {
  id: string;
  name: string;
  email: string;
  cniUrl: string;
  cvUrl?: string;
}

export default function PagePrestataires() {
  const [prestataires, setPrestataires] = useState<Prestataire[]>([]);

  // Charger les prestataires non validés
  useEffect(() => {
    const fetchPrestataires = async () => {
      const res = await fetch("/api/admin/prestataires");
      const data = await res.json();
      setPrestataires(data);
    };

    fetchPrestataires();
  }, []);

  const valider = async (id: string) => {
    await fetch("/api/admin/prestataires", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setPrestataires((prev) =>
      prev.filter((p) => p.id !== id) // On enlève une fois validé
    );
  };

  const supprimer = async (id: string) => {
    await fetch("/api/admin/prestataires", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    setPrestataires((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div>
      <SectionTitle title="Prestataires à valider" />
      <table className="w-full border bg-white rounded-xl shadow-sm text-sm">
        <thead className="bg-[#0CB2D4] text-white">
          <tr>
            <th className="px-4 py-2 text-left">Nom</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2">CNI</th>
            <th className="px-4 py-2">CV</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {prestataires.map((p) => (
            <tr key={p.id} className="border-t">
              <td className="px-4 py-2">{p.name}</td>
              <td className="px-4 py-2">{p.email}</td>
              <td className="px-4 py-2 text-center">
                <a
                  href={p.cniUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  Voir
                </a>
              </td>
              <td className="px-4 py-2 text-center">
                {p.cvUrl ? (
                  <a
                    href={p.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Voir
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="px-4 py-2 flex gap-2 justify-center">
                <button
                  onClick={() => valider(p.id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                >
                  Valider
                </button>
                <button
                  onClick={() => supprimer(p.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
