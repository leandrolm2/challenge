import { Router, Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const router = Router();

// Mock de usuários permitidos
const allowedUsers = [
  { id: "1", email: "admin@example.com", password: "admin" },
  { id: "2", email: "leandro@example.com", password: "123456" },
];

// Cadastro de usuário simulado
router.post("/singup", async (req: Request, res: Response): Promise<void> => {
  console.log(req.body);
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Email and password are required." });
    return;
  }

  // Verifica se já existe
  const exists = allowedUsers.find((u) => u.email === email);
  if (exists) {
    res.status(409).json({ error: "Email already exists." });
    return;
  }

  // Adiciona ao array (mock)
  const newUser = { id: String(allowedUsers.length + 1), email, password };
  allowedUsers.push(newUser);

  res.status(201).json({ id: newUser.id, email: newUser.email });
  return;
});

// Login simulado
router.post("/login", async (req: Request, res: Response): Promise<void> => {
  const { name, password } = req.body;

  if (!name || !password) {
    res.status(400).json({ error: "Name and password are required." });
    return;
  }

  // Busca no array mock
  const user = allowedUsers.find(
    (u) => u.email === name && u.password === password
  );

  if (!user) {
    // Retorna erro, mas sempre como JSON
    res.status(401).json({ error: "Invalid credentials." });
    return;
  }

  // Simula um token
  const token = "fake-jwt-token";

  // Retorno compatível com LoginResponse esperado pelo Angular
  res.json({
    token,
    name: user.email,
  });
  return;
});

// Health check
const prisma = new PrismaClient();
router.get("/ping", async (_req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  res.send({ alo: "pong", users });
});

export default router;
