import { Response } from "express";
import { Types } from "mongoose";
import Medicine from "../../models/Medicine";
import z from "zod";
import { AuthRequest } from "../../middleware/auth.middleware";

export async function getMedicines(req: AuthRequest, res: Response) {
  const userId = req.user!._id;

  const medicines = await Medicine.find({ user: userId }).populate("category", "name").sort({ expireDate: 1 });

  return res.status(200).json({
    data: medicines,
  });
}

export async function createMedicine(req: AuthRequest, res: Response) {
  const medicineSchema = z.object({
    name: z.string().min(2),
    quantity: z.number().min(0),
    unit: z.enum(["tablet", "strip", "ml", "bottle"]),
    expireDate: z.coerce.date(),
    note: z.string().optional(),
    category: z.string().length(24),
  });

  const parsed = medicineSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const userId = req.user!._id;

  const medicine = await Medicine.create({
    ...parsed.data,
    user: userId,
  });

  return res.status(201).json({
    success: "Medicine created successfully",
    medicine,
  });
}

export async function updateMedicine(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const userId = req.user!._id;

  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid medicine id" });

  const medicineSchema = z.object({
    name: z.string().min(2),
    quantity: z.number().min(0),
    unit: z.enum(["tablet", "strip", "ml", "bottle"]),
    expireDate: z.coerce.date(),
    note: z.string().optional(),
    category: z.string().length(24),
  });

  const parsed = medicineSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  // parsed.data = {
  //   name: "C1000",
  //   quantity: 10,
  //   unit: "strip",
  //   expireDate: 2025-01-01T00:00:00.000Z,
  //   note: "after meal",
  //   category: "64fd..."
  // }

  const medicine = await Medicine.findOneAndUpdate(
    { _id: id, user: userId }, // 🔐 ownership check
    parsed.data,
    { new: true, runValidators: true }
  );

  if (!medicine) return res.status(404).json({ error: "Medicine not found" });

  return res.status(200).json({
    success: "Medicine updated successfully",
    medicine,
  });
}

export async function deleteMedicine(req: AuthRequest, res: Response) {
  const { id } = req.params;
  const userId = req.user!._id;

  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid medicine id" });

  const deleted = await Medicine.findOneAndDelete({
    _id: id,
    user: userId,
  });

  if (!deleted) return res.status(404).json({ error: "Medicine not found" });

  return res.status(200).json({
    success: "Medicine deleted successfully",
  });
}
