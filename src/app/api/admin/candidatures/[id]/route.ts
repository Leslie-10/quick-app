import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { statut } = await req.json();

    if (!["validée", "refusée"].includes(statut)) {
      return new NextResponse("Statut invalide", { status: 400 });
    }

    const id = Number(params.id);

    await prisma.candidatures.update({
      where: { id },
      data: { statut },
    });

    return new NextResponse("Candidature mise à jour");
  } catch (error) {
    console.error("Erreur mise à jour candidature:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = Number(params.id);

    await prisma.candidatures.delete({
      where: { id },
    });

    return new NextResponse("Candidature supprimée");
  } catch (error) {
    console.error("Erreur suppression candidature:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
