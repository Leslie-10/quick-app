"use client";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Profession {
  id: number;
  nom: string;
}

export default function PageAdminProfessions() {
  const [professions, setProfessions] = useState<Profession[]>([]);
  const [newNom, setNewNom] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProfessions = async () => {
    try {
      const res = await fetch("/api/admin/professions");
      const data = await res.json();
      setProfessions(data);
    } catch (e) {
      console.error("Erreur chargement :", e);
    } finally {
      setLoading(false);
    }
  };

  const addProfession = async () => {
    if (!newNom.trim()) return;

    const res = await fetch("/api/admin/professions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom: newNom }),
    });

    if (res.ok) {
      const ajoutée = await res.json();
      setProfessions((prev) => [...prev, ajoutée]);
      setNewNom("");
    } else {
      const err = await res.json();
      alert(err.error || "Erreur ajout");
    }
  };

  const deleteProfession = async (id: number) => {
    if (!confirm("Supprimer cette profession ?")) return;

    const res = await fetch(`/api/admin/professions/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProfessions((prev) => prev.filter((p) => p.id !== id));
    } else {
      const err = await res.json();
      alert(err.error || "Erreur suppression");
    }
  };

  useEffect(() => {
    fetchProfessions();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0CB2D4] mb-4">🛠️ Professions disponibles</h1>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Nouvelle profession"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
        />
        <Button onClick={addProfession}>➕ Ajouter</Button>
      </div>

      {loading ? (
        <p>Chargement...</p>
      ) : professions.length === 0 ? (
        <p>Aucune profession.</p>
      ) : (
        <ul className="space-y-2">
          {professions.map((p) => (
            <li key={p.id} className="flex justify-between items-center border p-3 rounded bg-white shadow">
              <span>{p.nom}</span>
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => deleteProfession(p.id)}
              >
                ❌ Supprimer
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
