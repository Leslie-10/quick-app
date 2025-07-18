import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("📡 API /api/admin/categories");

    const categories = await prisma.categorie.findMany({
      select: { id: true, nom: true },
      orderBy: { nom: "asc" },
    });

    console.log("✅ Catégories récupérées :", categories);

    return NextResponse.json(categories);
  } catch (error) {
    console.error("❌ Erreur dans GET /admin/categories :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { nom } = await req.json();

    if (!nom || nom.trim().length < 2) {
      return NextResponse.json({ error: "Nom invalide" }, { status: 400 });
    }

    const exist = await prisma.categorie.findFirst({ where: { nom } });
    if (exist) {
      return NextResponse.json({ error: "Catégorie déjà existante" }, { status: 400 });
    }

    const newCat = await prisma.categorie.create({ data: { nom } });

    return NextResponse.json(newCat);
  } catch (error) {
    console.error("❌ Erreur dans POST /admin/categories :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
