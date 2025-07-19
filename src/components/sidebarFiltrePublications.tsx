"use client";

import { useEffect, useState } from "react";

export default function SidebarFiltrePublications({
  categorieActive,
  onSelectCategorie,
}: {
  categorieActive: string | null;
  onSelectCategorie: (categorie: string | null) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/admin/categories");

        if (!res.ok) {
          const message = await res.text();
          throw new Error(`Erreur API : ${res.status} - ${message}`);
        }

        const data = await res.json();
        console.log("🟦 Catégories reçues :", data);

        if (Array.isArray(data)) {
          setCategories(data.map((c) => c.nom));
        } else {
          throw new Error("Format de réponse inattendu");
        }
      } catch (error) {
        console.error("❌ Erreur lors du chargement des catégories :", error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <aside className="w-64 bg-[#f0f9fc] p-4 border-r">
      <h2 className="text-lg font-semibold mb-4 text-gray-700">Catégories</h2>
      <ul className="space-y-2">
        <li>
          <button
            className={`block w-full text-left p-2 rounded-lg ${
              categorieActive === null
                ? "bg-[#0CB2D4] text-white"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            onClick={() => onSelectCategorie(null)}
          >
            Toutes les annonces
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`block w-full text-left p-2 rounded-lg ${
                categorieActive === cat
                  ? "bg-[#0CB2D4] text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onSelectCategorie(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
