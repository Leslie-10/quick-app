import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const annonces = await prisma.besoin.findMany({
      include: {
        user: { select: { nom: true, email: true } },     // client = user dans prisma
        categorie: { select: { nom: true } },
      },
      orderBy: { creeLe: "desc" },
    });

    return NextResponse.json(annonces, { status: 200 });
  } catch (error) {
    console.error("Erreur chargement annonces admin:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "ID manquant" }, { status: 400 });
    }

    // Suppression de l'annonce
    await prisma.besoin.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Annonce supprimée" }, { status: 200 });
  } catch (error) {
    console.error("Erreur suppression annonce admin:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
