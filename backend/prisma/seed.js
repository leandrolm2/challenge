const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    create: {
      email: "leandro@example.com",
      password: "12345",
    },
    update: {
      email: "leandro@example.com",
      password: "12345",
    },
    where: {
      email: "leandro@example.com",
    },
  });

  return user;
}

main()
  .then((user) => {
    console.log("user", user);
  })
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
