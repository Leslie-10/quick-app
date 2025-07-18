import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { writeFile, mkdir, stat } from "fs/promises";
import path from "path";
import { existsSync } from "fs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const besoinId = parseInt(formData.get("besoinId") as string);
    const prestataireId = parseInt(formData.get("prestataireId") as string);
    const biographie = formData.get("biographie") as string;
    const professionId = parseInt(formData.get("professionId") as string);

    const budgetProposeRaw = formData.get("budgetPropose") as string | null;
    const justificationBudget = formData.get("justificationBudget") as string | null;

    const budgetPropose = budgetProposeRaw ? parseFloat(budgetProposeRaw) : undefined;

    const cni = formData.get("cni") as File;
    const cv = formData.get("cv") as File | null;
    const attestation = formData.get("attestation") as File | null;

    if (!cni) {
      return NextResponse.json({ error: "CNI obligatoire." }, { status: 400 });
    }

    // 🔐 S'assurer que le dossier "public/uploads" existe et est bien un dossier
    const uploadsDir = path.join(process.cwd(), "public", "uploads");

    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, { recursive: true });
    } else {
      const stats = await stat(uploadsDir);
      if (!stats.isDirectory()) {
        throw new Error("'public/uploads' existe déjà mais ce n'est pas un dossier.");
      }
    }

    const saveFile = async (file: File) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const filename = `${uuidv4()}-${file.name}`;
      const filepath = path.join(uploadsDir, filename);
      await writeFile(filepath, buffer);
      return `/uploads/${filename}`;
    };

    const cniPath = await saveFile(cni);
    const cvPath = cv ? await saveFile(cv) : null;
    const attestationPath = attestation ? await saveFile(attestation) : null;

    const candidature = await prisma.candidatures.create({
      data: {
        besoinId,
        prestataireId,
        biographie,
        professionId,
        budgetPropose: budgetPropose || 0,
        justificationBudget: justificationBudget || undefined,
        cni: cniPath,
        cv: cvPath ?? undefined,
        attestation: attestationPath ?? undefined,
      },
    });

    return NextResponse.json(
      { message: "Candidature enregistrée", candidature },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur de création candidature :", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
