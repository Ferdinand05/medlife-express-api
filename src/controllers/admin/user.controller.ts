import { Request, Response } from "express";
import User from "../../models/User";
import { IUser } from "../../types/user";
import z from "zod";
import bcrypt from "bcrypt";
import { Types } from "mongoose";
import Medicine from "../../models/Medicine";
import { formatZodErrors } from "../../utils/formatZodError";

// controller
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
    telepon: z.string().max(15).min(3),
  });

  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: formatZodErrors(parsed.error) });

  const { username, email, password, role, telepon } = parsed.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({ username, email, role, password: hashedPassword, telepon });

    return res.status(201).json({
      success: "Data created successfully",
      user: user,
    });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
}

export async function updateUser(req: Request, res: Response) {
  const { id } = req.params;

  const userSchema = z.object({
    username: z.string().min(3),
    email: z.email(),
    password: z.string().min(7).optional(),
    role: z.enum(["admin", "user"]),
    telepon: z.string().max(15).min(3),
  });

  const parsed = userSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: formatZodErrors(parsed.error) });
  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid format Id." });

  const { username, email, password, role, telepon } = parsed.data;

  let hashedPassword: string | undefined;
  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  }

  try {
    const updateData: IUser = { username, email, role, telepon };

    if (hashedPassword) updateData.password = hashedPassword;

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    return res.status(200).json({
      success: "Data updated successfully",
      user: user,
    });
  } catch (err: any) {
    if (err.code == 11000) return res.status(401).json({ error: "Duplicate Key Value", keyValue: err.keyValue });
    return res.status(500).json({ error: err });
  }
}

export async function deleteUser(req: Request, res: Response) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid format Id." });

  const user = await User.findById(id);

  if (!user) return res.status(404).json({ error: "User not found." });

  // Delete medicinenya
  await Medicine.deleteMany({ user: id });
  // delete user
  await user.deleteOne();

  return res.status(200).json({ success: "User and Medicines deleted successfully." });
}
