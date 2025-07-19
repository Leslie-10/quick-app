import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, motDePasse } = body;

    if (!email || !motDePasse) {
      return NextResponse.json(
        { message: "Email et mot de passe requis." },
        { status: 400 }
      );
    }

    //  On cherche un utilisateur dans la table users
    const user = await prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Aucun compte trouvé avec cet email." },
        { status: 401 }
      );
    }

    // On compare le mot de passe entré avec le hash stocké
    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasseHash);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Mot de passe incorrect." },
        { status: 401 }
      );
    }

    // Connexion réussie
    return NextResponse.json({
      message: "Connexion réussie.",
      utilisateur: {
        id: user.id,
        email: user.email,
        nom: user.nom,
        phone: user.telephone,
        role: user.role,
      },
    });
  } catch (error: any) {
    console.error("❌ Erreur de connexion :", error);
    return NextResponse.json(
      { message: "Erreur serveur lors de la connexion." },
      { status: 500 }
    );
  }
}