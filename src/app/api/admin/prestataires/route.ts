import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const prestataires = await prisma.profil_prestataire.findMany({
      where: {
        statutValidation: "en_attente",
      },
      include: {
        user: true,           // pour avoir email, nom, téléphone, etc.
        profession: true,     // pour le nom de la profession
      },
    });

    return NextResponse.json(prestataires);
  } catch (error) {
    console.error("Erreur GET prestataires:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

// Valider un prestataire en mettant son statutValidation à "valide"
export async function PUT(req: Request) {
  try {
    const { id } = await req.json();
    await prisma.profil_prestataire.update({
      where: { id },
      data: { statutValidation: "valide" },
    });
    return new NextResponse("Validé avec succès");
  } catch (error) {
    console.error("Erreur PUT prestataire:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}

// Supprimer un prestataire : suppression du user et cascade sur profil_prestataire
export async function DELETE(req: Request) {
  try {
    const { userId } = await req.json();
    await prisma.users.delete({
      where: { id: userId },
    });
    return new NextResponse("Supprimé avec succès");
  } catch (error) {
    console.error("Erreur DELETE prestataire:", error);
    return new NextResponse("Erreur serveur", { status: 500 });
  }
}
