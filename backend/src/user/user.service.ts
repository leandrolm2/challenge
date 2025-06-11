import { PrismaClient } from "../../generated/prisma";
import {PublicUser, User } from "./types/types.user"
const prisma = new PrismaClient();


export class UserService {
  async createUser(email: string, password: string): Promise<PublicUser | null> {
    return prisma.user.create({
      data: { email, password },
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
    });
  }

  async findMany(): Promise<PublicUser[] | User[]> {
    return prisma.user.findMany();
  }
}

export const userService = new UserService();