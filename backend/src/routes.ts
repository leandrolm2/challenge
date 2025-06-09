import { Router, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { email, password } = {email: 'user@email', password: 'userpassword'}

  // Validação simples
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = await prisma.user.create({
      data: { email, password }
    });
    
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error: any) {
    if (error.code === 'P2002') { // Unique constraint failed
      return res.status(409).json({ error: 'Email already exists.' });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
});

export default router;