'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, Trash2 } from "lucide-react";

export default function PageCategoriesAdmin() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newNom, setNewNom] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingNom, setEditingNom] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/admin/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Erreur chargement catégories :", err);
    }
  };

  const ajouterCategorie = async () => {
    if (newNom.trim().length < 2) return;
    try {
      await axios.post("/api/admin/categories", { nom: newNom });
      setNewNom("");
      fetchCategories();
    } catch (err) {
      console.error("Erreur ajout :", err);
    }
  };

  const supprimerCategorie = async (id: number) => {
    if (!confirm("Supprimer cette catégorie ?")) return;
    try {
      await axios.delete(`/api/admin/categories/${id}`);
      fetchCategories();
    } catch (err) {
      console.error("Erreur suppression :", err);
    }
  };

  const modifierCategorie = async (id: number) => {
    if (editingNom.trim().length < 2) return;
    try {
      await axios.put(`/api/admin/categories/${id}`, { nom: editingNom });
      setEditingId(null);
      setEditingNom("");
      fetchCategories();
    } catch (err) {
      console.error("Erreur modification :", err);
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center">Gestion des catégories</h1>

      {/* Ajout */}
      <div className="flex gap-2 mb-6">
        <Input
          placeholder="Nom de la nouvelle catégorie"
          value={newNom}
          onChange={(e) => setNewNom(e.target.value)}
        />
        <Button onClick={ajouterCategorie} className="bg-[#0CB2D4] hover:bg-[#0a9fbf]">
          Ajouter
        </Button>
      </div>

      {/* Liste */}
      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="flex items-center justify-between bg-white rounded-xl p-4 shadow border"
          >
            {editingId === cat.id ? (
              <div className="flex-1 flex gap-2 items-center">
                <Input
                  value={editingNom}
                  onChange={(e) => setEditingNom(e.target.value)}
                />
                <Button
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => modifierCategorie(cat.id)}
                >
                  Enregistrer
                </Button>
              </div>
            ) : (
              <div className="flex-1">{cat.nom}</div>
            )}

            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={() => {
                  setEditingId(cat.id);
                  setEditingNom(cat.nom);
                }}
              >
                <Pencil className="w-4 h-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => supprimerCategorie(cat.id)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
