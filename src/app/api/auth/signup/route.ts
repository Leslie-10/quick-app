import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      email,
      password,
      name,
      birthDate,
      phone,
      gender,
      city,
      neighborhood
    } = body;

    
    if (!email || !password) {
      return NextResponse.json({ error: 'Email et mot de passe requis.' }, { status: 400 });
    }

    
    const existingUser = await prisma.users.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'Cet email est déjà utilisé.' }, { status: 400 });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const userData: any = {
      email,
      motDePasseHash: hashedPassword,
    };

    if (name) userData.nom = name;
    if (birthDate) userData.dateNaissance = new Date(birthDate);
    if (phone) userData.telephone = phone;
    if (gender) userData.sexe = gender;
    if (city) userData.ville = city;
    if (neighborhood) userData.quartier = neighborhood;

    
    const newUser = await prisma.users.create({
      data: userData
    });

    return NextResponse.json({ message: 'Utilisateur créé avec succès', userId: newUser.id }, { status: 201 });
  } catch (e: any) {
    console.error('Erreur API signup:', e);
    return NextResponse.json({ 
      error: 'Erreur serveur ou de validation',
      details: e.message 
    }, { status: 500 });
  }
}