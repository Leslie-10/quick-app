import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("📡 API /api/admin/professions");

    const professions = await prisma.profession.findMany({
      select: { id: true, nom: true },
      orderBy: { nom: "asc" },
    });

    console.log("✅ Professions récupérées :", professions);

    return NextResponse.json(professions);
  } catch (error) {
    console.error("❌ Erreur dans GET /admin/professions :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
