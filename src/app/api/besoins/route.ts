import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      titre,
      description,
      ville,
      quartier,
      dateRdv,
      budget,
      categorieId,
      userId,
    } = body;

    // Vérification des champs
    if (
      !titre || !description || !ville || !quartier ||
      !dateRdv || !budget || !categorieId || !userId
    ) {
      return NextResponse.json(
        { error: "Champs requis manquants." },
        { status: 400 }
      );
    }

    const nouveauBesoin = await prisma.besoin.create({
      data: {
        titre,
        description,
        ville,
        quartier,
        dateRdv: new Date(dateRdv),
        budget: parseFloat(budget),
        categorieId: parseInt(categorieId),
        userId: parseInt(userId),
      },
    });

    return NextResponse.json(
      { message: "Besoin créé avec succès", besoin: nouveauBesoin },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erreur création besoin :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const besoins = await prisma.besoin.findMany({
      include: {
        categorie: true,
        user: {
          select: { nom: true }
        }
      },
      orderBy: {
        creeLe: "desc"
      }
    });

    return NextResponse.json(besoins, { status: 200 });
  } catch (error) {
    console.error("Erreur lors du chargement des besoins :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
