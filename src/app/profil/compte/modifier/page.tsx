"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ModifierProfilPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get("section"); // perso ou pro

  const [formData, setFormData] = useState({
    nom: "Leslie Mb",
    ville: "Douala",
    telephone: "6XX XXX XXX",
    profession: "Électricien",
    bio: "Je suis un électricien expérimenté depuis 5 ans.",
  });

  const professions = [
    "Électricité",
    "Plomberie",
    "Bricolage",
    "Service d'entretien",
    "Garde d'enfants",
    "Cours particuliers",
    "Déménagememt",
    "Informatique & Dépanage"
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const type = section === "pro" ? "professionnelles" : "personnelles";
    console.log(`Infos ${type} enregistrées :`, formData);
    alert(`Informations ${type} mises à jour !`);
    router.push("/profil/compte"); // ✅ Retour vers page compte
  };

  // Gestion si aucun paramètre section
  if (section !== "perso" && section !== "pro") {
    return (
      <main className="min-h-screen h-100% w-full flex items-center flex-col justify-center text-center p-4">
        <p className="text-red-600 font-semibold">
          ❌ Erreur : section invalide. Veuillez accéder depuis votre tableau de bord.
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen w-full  bg-white p-6 ">
        <div className="max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0CB2D4] mb-6">
        ✏️ Modifier mes informations {section === "pro" ? "professionnelles" : "personnelles"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 🧍 Infos personnelles */}
        {section === "perso" && (
          <>
            <div >
              <label className="block mb-1  text-sm text-gray-700">Nom</label>
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                required
                className="w-[80%] border rounded-xl px-4 py-2 outline-none text-gray-500 focus:ring-2 focus:ring-[#0CB2D4]"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">Ville</label>
              <input
                type="text"
                name="ville"
                value={formData.ville}
                onChange={handleChange}
                required
                className="w-[80%] border rounded-xl px-4 py-2 outline-none text-gray-500 focus:ring-2 focus:ring-[#0CB2D4]"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-700">Téléphone</label>
              <input
                type="tel"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                required
                className="w-[80%] border rounded-xl px-4 py-2 outline-none text-gray-500 focus:ring-2 focus:ring-[#0CB2D4]"
              />
            </div>
          </>
        )}

        {/*  Infos professionnelles */}
        {section === "pro" && (
          <>
            <div>
              <label className="block mb-1 text-sm text-gray-700">Profession</label>
              <select
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                required
                className="w-full  border rounded-xl px-4 py-2 bg-white outline-none text-gray-500 focus:ring-2 focus:ring-[#0CB2D4]"
              >
                <option value="">-- Sélectionnez votre profession --</option>
                {professions.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
                           <div>
              <label className="block mb-1 text-sm text-gray-700">Biographie</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows={4}
                placeholder="Parlez un peu de vous..."
                required
                className="w-full  border rounded-xl px-4 py-2 outline-none text-gray-500 focus:ring-2 focus:ring-[#0CB2D4]"
              ></textarea>
            </div>
          </>
        )}

        {/* BOUTONS */}
        <div className="flex justify-between pt-4">
          <button
            type="button"
            onClick={() => router.push("/profil/compte")}
            className="px-4 py-2 bg-gray-200 text-gray-700 mt-[100px] rounded-xl hover:bg-gray-300"
          >
            Retour au compte
          </button>

          <button
            type="submit"
            className="px-6 py-2 bg-[#0CB2D4] mt-[100px] text-white rounded-xl hover:opacity-90"
          >
            Enregistrer
          </button>
        </div>
      </form>
      </div>
    </main>
  );
}