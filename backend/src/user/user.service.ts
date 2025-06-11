import { PrismaClient } from "../../generated/prisma";
import {PublicUser, User } from "./types/types.user"
const prisma = new PrismaClient();


export class UserService {
  async createUser(email: string, password: string): Promise<PublicUser | null> {
    return prisma.user.create({
      data: { email, password },
      select: {
        id: true,
        email: true
      }
    });
  }

  async findByEmail(email: string): Promise<PublicUser | User |  null> {
    return prisma.user.findUnique({
      where: { email },
    });
  }

  async findById(id: string): Promise<PublicUser | null> {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true
      }
    });
  }

  async findMany(): Promise<PublicUser[] | User[] | null> {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true
      }
    });
  }
}

export const userService = new UserService();