"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function PagePostuler() {
  const { titre } = useParams();
  const [cv, setCv] = useState<File | null>(null);
  const [cni, setCni] = useState<File | null>(null);
  const [attestation, setAttestation] = useState<File | null>(null);
  const [biographie, setBiographie] = useState("");
  const [professionId, setProfessionId] = useState(""); // ✅ ici on utilise l'ID directement
  const [etatValidation, setEtatValidation] = useState<"valide" | "en_attente" | "refuse" | "non">("non");
  const [budgetPropose, setBudgetPropose] = useState("");
  const [justificationBudget, setJustificationBudget] = useState("");

  // Simule les IDs pour l'exemple (à dynamiser)
  const prestataireId = 1;
  const besoinId = 1; // ✅ À dynamiser plus tard (depuis URL ou API)
  const besoinUserId = 2; // 👉 À récupérer dynamiquement (ex: ID du client auteur de l'annonce)

  const professions = [
    { id: 1, nom: "Électricité" },
    { id: 2, nom: "Plomberie" },
    { id: 3, nom: "Bricolage" },
    { id: 4, nom: "Service d'entretien" },
    { id: 5, nom: "Garde d'enfants" },
    { id: 6, nom: "Cours particuliers" },
    { id: 7, nom: "Déménagement" },
    { id: 8, nom: "Informatique & Dépannage" },
  ];

  useEffect(() => {
    const statut = localStorage.getItem("validationPrestataire");
    if (statut === "valide") setEtatValidation("valide");
    else if (statut === "en_attente") setEtatValidation("en_attente");
    else if (statut === "refuse") setEtatValidation("refuse");
  }, []);

  // --- AJOUT CONDITION pour empêcher de postuler à sa propre annonce ---
  if (prestataireId === besoinId) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-8">
        <div className="bg-yellow-100 p-6 rounded-xl shadow-md max-w-lg text-center">
          <p className="text-lg font-semibold text-yellow-800">
            Vous ne pouvez pas postuler à votre propre annonce.
          </p>
          <Link href="/besoins/annonces" className="mt-4 inline-block text-[#0CB2D4] underline">
            Retour aux publications
          </Link>
        </div>
      </div>
    );
  }
  

  const envoyerCandidature = async () => {
    if (!cni || !biographie || !professionId) {
      alert("Veuillez remplir tous les champs obligatoires marqués d'un *.");
      return;
    }

    const formData = new FormData();
    formData.append("besoinId", besoinId);
    formData.append("prestataireId", prestataireId);
    formData.append("biographie", biographie);
    formData.append("professionId", professionId);
    formData.append("cni", cni);
    if (cv) formData.append("cv", cv);
    if (attestation) formData.append("attestation", attestation);
    if (budgetPropose) formData.append("budgetPropose", budgetPropose);
    if (justificationBudget) formData.append("justificationBudget", justificationBudget);

    try {
      const response = await fetch("/api/candidatures", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        alert("Erreur : " + (result.error || "Erreur serveur"));
        return;
      }

      alert("Votre candidature a bien été envoyée et est en attente de validation par l'administrateur.");
      localStorage.setItem("validationPrestataire", "en_attente");
      setEtatValidation("en_attente");
    } catch (error) {
      console.error("Erreur lors de l'envoi :", error);
      alert("Erreur réseau, veuillez réessayer plus tard.");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    envoyerCandidature();
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 py-8">
      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-[#0CB2D4] mb-4">
          Postuler à l’annonce : {decodeURIComponent(titre as string)}
        </h1>

        {etatValidation === "en_attente" ? (
          <div className="text-center text-gray-700 bg-[#FEF9E7] border border-yellow-300 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-2">⏳ En attente de validation</h2>
            <p className="mb-4">
              Votre demande est en cours de vérification. Vous serez notifié dès qu’elle sera validée.
            </p>
            <Link href="/besoins/annonces" className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300">
              Retour aux publications
            </Link>
          </div>
        ) : etatValidation === "refuse" ? (
          <div className="text-center text-red-700 bg-[#FDECEA] border border-red-300 p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold mb-2">❌ Demande refusée</h2>
            <p className="mb-4">
              Votre demande de validation a été refusée. Contactez le support si nécessaire.
            </p>
            <Link href="/besoins/annonces" className="inline-block bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300">
              Retour aux publications
            </Link>
          </div>
        ) : (
          <>
            {etatValidation === "valide" ? (
              <div className="bg-[#F0FAFD] border border-[#B3E5FC] rounded-2xl p-6 text-center shadow-md">
                <h2 className="text-2xl font-bold text-[#0CB2D4] mb-4">👋 Salut !</h2>
                <p className="text-gray-700 mb-6">
                  Vous avez déjà un profil validé. Cliquez sur <strong>"Confirmer"</strong> pour postuler à :
                  <br />
                  <span className="font-semibold text-[#0CB2D4]">
                    {decodeURIComponent(titre as string)}
                  </span>
                </p>
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      const anciennes = JSON.parse(localStorage.getItem("notifications") || "[]");
                      const nouvelleNotif = {
                        id: Date.now(),
                        message: `Leslie Mb s'est proposé pour "${decodeURIComponent(titre as string)}".`,
                        date: new Date().toLocaleString(),
                        lu: false,
                      };
                      localStorage.setItem("notifications", JSON.stringify([nouvelleNotif, ...anciennes]));
                      alert("Votre candidature a été envoyée avec succès !");
                      window.location.href = "/besoins/annonces";
                    }}
                    className="bg-[#0CB2D4] text-white px-6 py-2 rounded-xl hover:opacity-90"
                  >
                    Confirmer
                  </button>
                  <Link href="/besoins/annonces" className="bg-gray-200 text-gray-700 px-6 py-2 rounded-xl hover:bg-gray-300">
                    Retour aux publications
                  </Link>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">📎 CV (optionnel)</label>
                  <input type="file" onChange={(e) => setCv(e.target.files?.[0] ?? null)} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-red-600">🪪 CNI (obligatoire) *</label>
                  <input type="file" onChange={(e) => setCni(e.target.files?.[0] ?? null)} required className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">🧾 Attestation (optionnel)</label>
                  <input type="file" onChange={(e) => setAttestation(e.target.files?.[0] ?? null)} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-red-600">🧑‍💼 Biographie (obligatoire) *</label>
                  <textarea value={biographie} onChange={(e) => setBiographie(e.target.value)} required className="w-full border rounded-xl px-3 py-2" rows={4} placeholder="Décrivez-vous..." />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-red-600">🛠 Profession (obligatoire) *</label>
                  <select value={professionId} onChange={(e) => setProfessionId(e.target.value)} required className="w-full border rounded-xl px-3 py-2">
                    <option value="">-- Sélectionnez une profession --</option>
                    {professions.map((p) => (
                      <option key={p.id} value={p.id.toString()}>{p.nom}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">💰 Budget proposé (optionnel)</label>
                  <input type="number" value={budgetPropose} onChange={(e) => setBudgetPropose(e.target.value)} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">📝 Justification budget (optionnel)</label>
                  <textarea value={justificationBudget} onChange={(e) => setJustificationBudget(e.target.value)} rows={3} className="w-full border rounded-xl px-3 py-2" />
                </div>
                <div className="flex justify-between items-center mt-6">
                  <Link href="/besoins/annonces" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-xl hover:bg-gray-300">Retour</Link>
                  <button type="submit" className="bg-[#0CB2D4] text-white px-4 py-2 rounded-xl hover:opacity-90">Envoyer la candidature</button>
                </div>
              </form>
            )}
          </>
        )}
      </div>
    </div>
  );
}
