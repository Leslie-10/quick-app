// /app/api/admin/utilisateurs/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Liste tous les utilisateurs
export async function GET() {
  try {
    const utilisateurs = await prisma.users.findMany({
      select: {
        id: true,
        nom: true,
        email: true,
        telephone: true,
        ville: true,
        quartier: true,
        creeLe: true,
      },
      orderBy: { creeLe: "desc" },
    });

    return NextResponse.json(utilisateurs);
  } catch (error) {
    console.error("Erreur récupération utilisateurs :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

// DELETE - Supprimer un utilisateur via /api/admin/utilisateurs?id=xxx
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID manquant" }, { status: 400 });
  }

  try {
    await prisma.users.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: "Utilisateur supprimé ✅" });
  } catch (error) {
    console.error("Erreur suppression utilisateur :", error);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
