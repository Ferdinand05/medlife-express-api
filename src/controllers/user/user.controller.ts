import { Request, Response } from "express";
import User from "../../models/User";
import { AuthRequest } from "../../middleware/auth.middleware";
import z from "zod";
import bcrypt from "bcrypt";
import { formatZodErrors } from "../../utils/formatZodError";
export async function getMe(req: AuthRequest, res: Response) {
  const userId = req.user?._id;

  console.log(userId);
  const user = await User.findOne({ _id: userId }).select("-updatedAt");
  return res.status(200).json({
    user,
  });
}

export async function changePassword(req: AuthRequest, res: Response) {
  const passwordSchema = z.object({
    oldPassword: z.string().min(7),
    newPassword: z.string().min(7),
  });

  const parsed = passwordSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: formatZodErrors(parsed.error) });

  const { newPassword, oldPassword } = parsed.data;
  // compare  password
  const user = await User.findById(req.user!._id).select("+password");
  const comparePassword = await bcrypt.compare(oldPassword, user!.password);

  if (!comparePassword) return res.status(400).json({ error: "Your current password is not valid" });

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await User.findByIdAndUpdate(req.user!._id, {
    password: hashedPassword,
  });

  return res.status(200).json({ success: "Password updated successfully." });
}

export async function updateUserInfo(req: AuthRequest, res: Response) {
  const userInfoSchema = z.object({
    username: z.string().min(3),
    telepon: z.string().max(15).min(3),
  });

  const parsed = userInfoSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: formatZodErrors(parsed.error) });

  const user = await User.findByIdAndUpdate(req.user?._id, parsed.data, {
    new: true,
    runValidators: true,
  }).select(["username", "telepon"]);

  return res.status(200).json({ success: "User Information Updated Successfully.", user });
}
