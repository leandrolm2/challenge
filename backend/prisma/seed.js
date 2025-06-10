const { PrismaClient } = requiire('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.create({
    data: {
      name: 'Leandro',
      email: 'leandro@example.com'
    }
  });
  console.log('user', user)
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
