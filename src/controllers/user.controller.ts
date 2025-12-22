import { Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../types/user";
import z from "zod";
import bcrypt from "bcrypt";
export async function getUsers(req: Request, res: Response) {
  const users: IUser[] = await User.find();

  if (users.length == 0) return res.status(400).json({ error: "Data empty" });

  return res.status(200).json({
    data: users,
  });
}

export async function createUser(req: Request, res: Response) {
  const userSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(7),
    role: z.enum(["admin", "user"]),
  });

  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const { username, email, password, role } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, role, password: hashedPassword });

    return res.status(201).json({
      success: "Data created successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}
