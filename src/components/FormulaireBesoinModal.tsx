"use client";

import { useState, useEffect } from "react";

export default function FormulaireBesoinModal({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState({
    titre: "",
    description: "",
    ville: "",
    quartier: "",
    date: "",
    budget: "",
  });

  const [categories, setCategories] = useState<{ id: number; nom: string }[]>([]);
  const [selectedCategorie, setSelectedCategorie] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");
        const data = await res.json();

        if (res.ok && Array.isArray(data)) {
          setCategories(data);
        } else {
          console.warn("Format inattendu :", data);
          setCategories([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des catégories :", error);
        setCategories([]);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/besoins", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          dateRdv: form.date,
          ville: form.ville,
          categorieId: selectedCategorie,
          userId: 1, // à remplacer dynamiquement
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Erreur : " + result.error);
      } else {
        alert("Annonce publiée !");
        onClose();
      }
    } catch (error) {
      console.error("Erreur lors de la soumission :", error);
      alert("Erreur de connexion au serveur.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-center text-[#0CB2D4]">Publier un besoin</h2>

      <input
        type="text"
        placeholder="Titre du besoin"
        value={form.titre}
        onChange={(e) => setForm({ ...form, titre: e.target.value })}
        className="w-full border p-2 rounded-xl placeholder-gray-700 text-gray-800"
        required
      />

      <textarea
        placeholder="Décrivez votre besoin"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full border p-2 rounded-xl placeholder-gray-700 text-gray-800"
        rows={3}
        required
      />

      <input
        type="text"
        placeholder="Ville"
        value={form.ville}
        onChange={(e) => setForm({ ...form, ville: e.target.value })}
        className="w-full border p-2 rounded-xl placeholder-gray-700 text-gray-800"
        required
      />

      <input
        type="text"
        placeholder="Quartier"
        value={form.quartier}
        onChange={(e) => setForm({ ...form, quartier: e.target.value })}
        className="w-full border p-2 rounded-xl placeholder-gray-700 text-gray-800"
        required
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="w-full border p-2 rounded-xl text-gray-800"
        required
      />

      <input
        type="text"
        placeholder="Quel est votre budget ?"
        value={form.budget}
        onChange={(e) => setForm({ ...form, budget: e.target.value })}
        className="w-full border p-2 rounded-xl placeholder-gray-700 text-gray-800"
        required
      />

      <select
        value={selectedCategorie}
        onChange={(e) => setSelectedCategorie(e.target.value)}
        className="w-full border p-2 rounded-xl text-gray-800"
        required
      >
        <option value="">-- Choisissez une catégorie --</option>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.nom}
            </option>
          ))
        ) : (
          <option disabled>Aucune catégorie disponible</option>
        )}
      </select>

      <div className="flex justify-end gap-4 pt-2">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 rounded-xl border border-gray-400 text-gray-600 hover:bg-gray-100"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 rounded-xl bg-[#0CB2D4] text-white hover:opacity-90"
        >
          Publier
        </button>
      </div>
    </form>
  );
}
