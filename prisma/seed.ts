import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const categories = [
    'Plomberie',
    'Électricité',
    "Service d'entretien",
    'Cours particuliers',
    'Bricolage',
    'Déménagement',
    'Garde d’enfants',
    'Informatique & Dépannage',
  ];

  for (const nom of categories) {
    await prisma.categorie.upsert({
      where: { nom },
      update: {},
      create: { nom },
    });
  }

  console.log(' Catégories insérées avec succès !');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  