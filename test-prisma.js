
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const users = await prisma.users.findMany();
  console.log("Utilisateurs trouvés :", users);
}

main()
  .catch((e) => {
    console.error("Erreur :", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });