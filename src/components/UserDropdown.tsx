"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function UserDropdown() {
  const [openTravaux, setOpenTravaux] = useState(false);
  const [openCompte, setOpenCompte] = useState(false);
  const router = useRouter();

  const handleRedirect = (path: string) => {
    router.push(path);
  };

  return (
    <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl p-2 z-50">
      <button
        onClick={() => handleRedirect("/profil/mes-annonces")}
        className="menu-item"
      >
        📋 Mes annonces
      </button>

      {/* Mes Travaux */}
      <div>
        <button
          onClick={() => setOpenTravaux(!openTravaux)}
          className="menu-item justify-between"
        >
          🛠️ Mes travaux
          {openTravaux ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {openTravaux && (
          <div className="pl-6 space-y-1">
            <button
              onClick={() => handleRedirect("/profil/mes-travaux/en-cours")}
              className="menu-subitem"
            >
              🔄 En cours
            </button>
            <button
              onClick={() => handleRedirect("/profil/mes-travaux/termines")}
              className="menu-subitem"
            >
              ✅ Terminés
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => handleRedirect("/profil/portefeuille")}
        className="menu-item"
      >
        💼 Mon portefeuille
      </button>

      {/* Mon compte */}
      <div>
        <button
          onClick={() => setOpenCompte(!openCompte)}
          className="menu-item justify-between"
        >
          👤 Mon compte
          {openCompte ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
        </button>
        {openCompte && (
          <div className="pl-6 space-y-1">
            <div className="text-sm text-gray-500">👋 Bienvenue Leslie</div>
            <button
              onClick={() => handleRedirect("/profil/infos-personnelles")}
              className="menu-subitem"
            >
              🧍 Infos personnelles
            </button>
            <button
              onClick={() => handleRedirect("/profil/infos-pro")}
              className="menu-subitem"
            >
              🛠️ Infos professionnelles
            </button>
          </div>
        )}
      </div>

      <button
        onClick={() => handleRedirect("/publier")}
        className="menu-item"
      >
        ➕ Publier un nouveau besoin
      </button>

      <button
        onClick={() => handleRedirect("/profil/mes-besoins")}
        className="menu-item"
      >
        📌 Mes besoins publiés
      </button>

      <button
        onClick={() => handleRedirect("/aide")}
        className="menu-item"
      >
        ❓ Besoin d’aide
      </button>

      <button
        onClick={() => {
          // Ajoute ici ta logique de déconnexion réelle si besoin
          console.log("Déconnexion");
        }}
        className="menu-item text-red-600"
      >
        🚪 Déconnexion
      </button>
    </div>
  );
}