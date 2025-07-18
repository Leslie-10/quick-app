import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface Params {
  params: { titre: string };
}

export async function GET(req: Request, { params }: Params) {
  try {
    const besoin = await prisma.besoin.findFirst({
      where: { titre: params.titre },
      select: { userId: true, titre: true },
    });

    if (!besoin) {
      return NextResponse.json({ error: "Annonce non trouvée" }, { status: 404 });
    }

    return NextResponse.json(besoin, { status: 200 });
  } catch (error) {
    console.error("Erreur récupération besoin :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

