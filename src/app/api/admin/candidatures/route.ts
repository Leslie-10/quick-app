import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const candidatures = await prisma.candidatures.findMany({
      where: {
        statut: "envoyee", 
      },
      include: {
        besoin: { select: { titre: true } },
        prestataire: { select: { nom: true, email: true } },
        profession: true,
      },
      orderBy: { creeLe: "desc" }, // ou createdAt si c’est le champ date standard
    });

    return NextResponse.json(candidatures, { status: 200 });
  } catch (error) {
    console.error("Erreur chargement candidatures admin :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
