const { PrismaClient } = require("../generated/prisma");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('123456', 10);

  const userData = {
    email: "leandro@example.com",
    password: hashedPassword,
  };

  const user = await prisma.user.upsert({
    where: { email: userData.email },
    update: userData,
    create: userData,
  });

  const tasks = await prisma.task.createMany({
    data: [
      {
        title: "Learn Prisma",
        description: "Understand how to use Prisma with Node.js",
        completed: false,
        userId: user.id,
      },
      {
        title: "Build a Task API",
        description: "Create a CRUD API for tasks using Express",
        completed: false,
        userId: user.id,
      },
      {
        title: "Write Unit Tests",
        description: "Ensure the application is properly tested",
        completed: true,
        userId: user.id,
      },
      {
        title: "Create Frontend UI",
        description: "Design a frontend interface for task management",
        completed: false,
        userId: user.id,
      },
      {
        title: "Deploy Application",
        description: "Deploy the project to a cloud provider",
        completed: false,
        userId: user.id,
      },
    ],
  });

  console.log("Tasks created:", tasks);
  return user;
}

main()
  .then((user) => {
    console.log("User created:", user);
  })
  .catch((e) => {
    console.error("Error seeding database:", e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
