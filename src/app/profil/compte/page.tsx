"use client";
import { useRouter } from "next/navigation";
import { User, FilePlus, Info } from "lucide-react";

export default function ComptePage() {
  const router = useRouter();

  return (
    <div className="bg-white min-h-screen">
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0CB2D4] mb-6">👋 Bienvenue sur votre tableau de bord</h1>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Bloc Mes publications */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#0CB2D4] mb-1">Mes besoins publiés</h2>
              <p className="text-gray-600 text-sm">Consultez et gérez vos annonces.</p>
            </div>
            <button
              onClick={() => router.push("/besoins/annonces")}
              className="bg-[#0CB2D4] text-white px-4 py-2 rounded-xl hover:opacity-90"
            >
              Voir
            </button>
          </div>

          {/* Bloc Publier un besoin */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-[#0CB2D4] mb-1">Publier un nouveau besoin</h2>
              <p className="text-gray-600 text-sm">Exprimez un nouveau besoin en quelques clics.</p>
            </div>
            <button
              onClick={() => router.push("/besoins/annonces")}
              className="bg-[#0CB2D4] text-white px-4 py-2 rounded-xl hover:opacity-90"
            >
              Publier
            </button>
          </div>

          {/* Bloc Profil */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between md:col-span-2">
            <div className="flex gap-4 items-center">
              <User size={32} className="text-[#0CB2D4]" />
              <div>
                <h2 className="text-xl font-semibold text-[#0CB2D4]">Mes informations Personnelles</h2>
                <p className="text-gray-600 text-sm">Nom : Leslie Mb</p>
                <p className="text-gray-600 text-sm">Ville : Douala</p>
                <p className="text-gray-600 text-sm">Téléphone : 6XX XXX XXX</p>
              </div>

            </div>
            <button 
            onClick={() => router.push("/profil/compte/modifier?section=perso")}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200">
              Modifier
            </button>
          </div>
                        
               <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between md:col-span-2">
            <div className="flex gap-4 items-center">
              <User size={32} className="text-[#0CB2D4]" />
              <div>
                <h2 className="text-xl font-semibold text-[#0CB2D4]">Mes informations Professionelles</h2>
                <p className="text-gray-600 text-md">Biographie: </p>
                <p className="text-gray-600 text-md">Profession: Electricien</p>
              </div>

            </div>
            <button 
            onClick={() => router.push("/profil/compte/modifier?section=pro")}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-200">
              Modifier
            </button>
          </div>

          {/* Bloc Aide */}
          <div className="bg-white p-6 rounded-2xl shadow flex items-center justify-between md:col-span-2">
            <div className="flex gap-4 items-center">
              <Info size={32} className="text-[#0CB2D4]" />
              <div>
                <h2 className="text-xl font-semibold text-[#0CB2D4]">Besoin d’aide ?</h2>
                <p className="text-gray-600 text-sm">Consultez notre FAQ ou contactez-nous.</p>
              </div>
            </div>
            <button className="bg-[#0CB2D4] text-white px-4 py-2 rounded-xl hover:opacity-90">
              FAQ
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}

  