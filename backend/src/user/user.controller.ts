import { Request, Response } from "express";
import { generateToken } from "../authentication/jwt";
import { comparePassword, hashPassword } from "../authentication/secretToken";
import { UserService } from "./user.service";
import { PublicUser, User } from "./types/types.user";

export class UserController {
  public userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;

    this.login = this.login.bind(this);
    this.singup = this.singup.bind(this);
    this.ping = this.ping.bind(this);
  }

  async singup(req: Request, res: Response): Promise<void> {
    const {email, password} = req.body;

    try {
      const exists = await this.userService.findByEmail(email);
      if (exists) {
        res.status(409).json({ error: "Email already exists." });
        return;
      }

      const hashedPassword: string = await hashPassword(password);

      const newUser: PublicUser | null = await this.userService.createUser(
        email,
        hashedPassword
      );

      if (!newUser) {
        res.status(500).json({ error: "Failed to create user." });
        return;
      }

      res.status(201).json(newUser);
      return;
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error.", message: error.message });
      return;
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const userResult = await this.userService.findByEmail(email);

      if (!userResult) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const user: User = userResult as User;

      const isPassword = await comparePassword(password, user.password);

      if (!isPassword) {
        res.status(401).json({ error: "invalid password" });
        return;
      }
      const token = generateToken({ id: user.id, email: user.email });
      res.json({ token });
      return;
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ error: "Internal server error.", message: error.message });
      return;
    }
  }

  async ping(_req: Request, res: Response): Promise<void> {
    try {
      const users: PublicUser[] | null = await this.userService.findMany();
      if (!users) {
        res.status(400).json({ error: "something whent wrogn" });
        return;
      }
      res.send({ alo: "pong alo", users });
    } catch (error: any) {
      res.status(500).json({ error: "Internal server error.", message: error.message });
      return;
    }
  }
}