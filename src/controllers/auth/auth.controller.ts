import { Request, Response } from "express";
import z from "zod";
import User from "../../models/User";
import jwt from "jsonwebtoken";
import { IUser } from "../../types/user";
import bcrypt from "bcrypt";

//
export async function login(req: Request, res: Response) {
  const loginSchema = z.object({
    email: z.email(),
    password: z.string().min(7),
  });

  const parsed = loginSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const { email, password } = parsed.data;

  const user: IUser | null = await User.findOne({ email }).select("+password");

  if (!user) return res.status(404).json({ error: "Email / Password is not valid" });

  const jwt_secret = process.env.JWT_SECRET;

  if (!user.password) return res.status(404).json({ error: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) return res.status(500).json({ error: "Invalid credentials" });

  try {
    const token = jwt.sign(
      {
        user_id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
      },
      jwt_secret as string,
      {
        expiresIn: "1d",
      }
    );

    return res.status(200).json({
      success: "Login Success!",
      token,
    });
  } catch (err: any) {
    return res.status(500).json({ error: err.name });
  }
}

export async function register(req: Request, res: Response) {
  const registerSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(7).trim(),
    telepon: z.string().max(15).min(3),
  });

  const parsed = registerSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: parsed.error });
  const { username, email, password, telepon } = parsed.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await User.create({ username, email, password: hashedPassword, telepon });
    return res.status(201).json({ success: "Account has been created successfully." });
  } catch (err: any) {
    if (err.code == 11000)
      return res.status(400).json({
        errors: {
          error: "Duplicate Key Value",
          keyvalue: err.keyValue,
        },
      });

    return res.status(400).json({ error: err });
  }
}
