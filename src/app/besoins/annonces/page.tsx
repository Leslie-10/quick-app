"use client";

import { useState, useEffect } from "react";
import SidebarFiltrePublications from "@/components/sidebarFiltrePublications";
import HeaderPublications from "@/components/HeaderPublications";
import Link from "next/link";

export default function PageAnnonces() {
  const [categorieActive, setCategorieActive] = useState<string | null>(null);
  const [annonces, setAnnonces] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnonces = async () => {
      try {
        const res = await fetch("/api/besoins", { cache: "no-store" });
        const data = await res.json();

        if (Array.isArray(data)) {
          setAnnonces(data);
        } else {
          console.error("Réponse inattendue de l’API :", data);
          setAnnonces([]);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des annonces :", error);
        setAnnonces([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnonces();
  }, []);

  const annoncesFiltrees = categorieActive
    ? annonces.filter((a) => a.categorie?.nom === categorieActive)
    : annonces;

  return (
    <>
      <HeaderPublications />
      <div className="flex min-h-screen bg-white">
        <SidebarFiltrePublications
          categorieActive={categorieActive}
          onSelectCategorie={setCategorieActive}
        />

        <main className="flex-1 p-6">
          <div className="text-center w-full mb-6">
            <h1 className="text-2xl font-bold text-[#0CB2D4]">Publications</h1>
            <p className="text-sm text-gray-700">
              Explorez les besoins des clients dans chaque catégorie.
            </p>
          </div>

          {loading ? (
            <p className="text-center text-gray-500">Chargement des annonces...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-9">
              {annoncesFiltrees.map((a) => (
                <div
                  key={a.id}
                  className="bg-white border border-gray-200 p-4 rounded-2xl shadow h-[200px] w-[455px] flex flex-col justify-between"
                >
                  <h3 className="text-lg font-bold text-[#0CB2D4]">{a.titre}</h3>
                  <p className="text-md text-gray-600">{a.description}</p>
                  <p className="text-sm text-gray-700">
                    {a.ville}, {a.quartier} –{" "}
                    {a.dateRdv ? new Date(a.dateRdv).toLocaleDateString() : "Date non précisée"}
                  </p>
                  <p className="text-sm font-semibold text-[#0CB2D4]">
                    Budget : {a.budget} FCFA
                  </p>
                  <Link
                    href={`/postuler/${a.titre}`}
                    className="mt-4 bg-[#0CB2D4] text-white px-4 py-2 rounded-xl hover:opacity-90 w-[100px]"
                  >
                    Postuler
                  </Link>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>
    </>
  );
}
