"use client";

import { useEffect, useState } from "react";

interface Candidature {
  id: number;
  besoin: { titre: string; userId: string };
  prestataire: { nom: string; email: string; id: string };
  profession: { nom: string };
  biographie: string;
  cni: string;
  cv?: string | null;
  attestation?: string | null;
  statut: "envoyée" | "validée" | "refusée";
  creeLe: string;
}

export default function PageAdminCandidatures() {
  const [candidatures, setCandidatures] = useState<Candidature[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtre, setFiltre] = useState<
    "toutes" | "envoyée" | "validée" | "refusée"
  >("toutes");

  const fetchCandidatures = async () => {
    try {
      const res = await fetch("/api/admin/candidatures");
      const data = await res.json();
      setCandidatures(data);
    } catch (error) {
      console.error("Erreur chargement candidatures :", error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatut = async (id: number, statut: "validée" | "refusée") => {
    try {
      const res = await fetch(`/api/admin/candidatures/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ statut }),
      });

      if (res.ok) {
        const updatedCandidature = candidatures.find((c) => c.id === id);

        if (statut === "validée" && updatedCandidature) {
          // Notification au client
          await fetch("/api/notifications/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: updatedCandidature.besoin.userId,
              message: `${updatedCandidature.prestataire.nom} a été validé pour votre service « ${updatedCandidature.besoin.titre} ». Vous pouvez maintenant le contacter.`,
            }),
          });
        }

        setCandidatures((prev) =>
          prev.map((c) => (c.id === id ? { ...c, statut } : c))
        );
      } else {
        const error = await res.json();
        alert("Erreur : " + error.message);
      }
    } catch {
      alert("Erreur lors de la mise à jour du statut.");
    }
  };

  useEffect(() => {
    fetchCandidatures();
  }, []);

  const candidaturesFiltrees =
    filtre === "toutes"
      ? candidatures
      : candidatures.filter((c) => c.statut === filtre);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold text-[#0CB2D4] mb-6"> Candidatures reçues</h1>

      <div className="flex gap-4 mb-6">
        {(["toutes", "envoyée", "validée", "refusée"] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFiltre(status)}
            className={`px-4 py-2 rounded-full border ${
              filtre === status
                ? "bg-[#0CB2D4] text-white"
                : "bg-white text-[#0CB2D4] hover:bg-[#0CB2D4] hover:text-white"
            }`}
          >
            {status === "toutes"
              ? "Toutes"
              : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {candidaturesFiltrees.length === 0 ? (
        <p className="text-gray-500">Aucune candidature trouvée.</p>
      ) : (
        <div className="space-y-6">
          {candidaturesFiltrees.map((c) => (
            <div
              key={c.id}
              className="border rounded-2xl p-4 shadow flex flex-col gap-2 bg-white"
            >
              <h2 className="text-lg font-semibold text-[#0CB2D4]">
                {c.prestataire.nom} - {c.profession.nom}
              </h2>
              <p className="text-gray-600">📧 {c.prestataire.email}</p>
              <p>
                <strong>Biographie :</strong> {c.biographie}
              </p>
              <p>
                <strong>Annonce :</strong> {c.besoin.titre}
              </p>
              <p>
                <strong>Statut :</strong>{" "}
                <span className="font-medium capitalize">{c.statut}</span>
              </p>

              <div className="flex flex-wrap gap-3 mt-2">
                <a
                  href={c.cni}
                  target="_blank"
                  className="text-blue-600 underline"
                  rel="noreferrer"
                >
                  Voir CNI
                </a>
                {c.cv && (
                  <a
                    href={c.cv}
                    target="_blank"
                    className="text-blue-600 underline"
                    rel="noreferrer"
                  >
                    Voir CV
                  </a>
                )}
                {c.attestation && (
                  <a
                    href={c.attestation}
                    target="_blank"
                    className="text-blue-600 underline"
                    rel="noreferrer"
                  >
                    Voir Attestation
                  </a>
                )}
              </div>

              {c.statut === "envoyée" && (
                <div className="flex gap-4 mt-3">
                  <button
                    onClick={() => updateStatut(c.id, "validée")}
                    className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
                  >
                    ✅ Valider
                  </button>
                  <button
                    onClick={() => updateStatut(c.id, "refusée")}
                    className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
                  >
                    ❌ Refuser
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
