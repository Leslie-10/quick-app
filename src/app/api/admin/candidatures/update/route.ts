import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

/**
 * Cette route permet à l'administrateur de mettre à jour le statut d'une candidature.
 * Si la candidature est acceptée, une notification est envoyée au client ayant publié l'annonce.
 */

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { candidatureId, statut } = body;

    if (!candidatureId || !["acceptee", "refusee"].includes(statut)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    // Mise à jour de la candidature avec le nouveau statut
    const candidature = await prisma.candidatures.update({
      where: { id: candidatureId },
      data: { statut },
      include: {
        besoin: {
          include: {
            user: true, // le client
          },
        },
        prestataire: true,
      },
    });

    // Si la candidature est acceptée => notifier le client
    if (statut === "acceptee") {
      const client = candidature.besoin.user;
      const prestataire = candidature.prestataire;
      const titreBesoin = candidature.besoin.titre;

      const message = `${prestataire.nom} a été validé pour votre service « ${titreBesoin} ». Vous pouvez maintenant le contacter.`;

      await prisma.notifications.create({
        data: {
          userId: client.id,
          message,
        },
      });
    }

    return NextResponse.json({ success: true, candidature });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de la candidature :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
