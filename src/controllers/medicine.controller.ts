import { Request, Response } from "express";
import Medicine from "../models/Medicine";
import z from "zod";
import { IMedicine } from "../types/medicine";

// controller
export async function getMedicines(req: Request, res: Response) {
  const medicines: IMedicine[] = await Medicine.find().populate("user").populate("category");

  if (medicines.length == 0) {
    return res.status(400).json({
      error: "Data empty",
    });
  }

  return res.status(200).json({
    data: medicines,
  });
}

export async function createMedicine(req: Request, res: Response) {
  const medicineSchema = z.object({
    name: z.string().min(2),
    quantity: z.number().min(0),
    unit: z.enum(["tablet", "string", "ml", "bottle"]),
    expireDate: z.coerce.date(),
    note: z.string().optional(),
    user: z.string().length(24),
    category: z.string().length(24),
  });

  const parsed = medicineSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: parsed.error });

  const { name, quantity, unit, expireDate, note, user, category } = parsed.data;

  const newMedicine = await Medicine.create({ name, quantity, unit, expireDate, note, user, category });

  return res.status(201).json({
    success: "Data created successfull.",
    medicine: newMedicine,
  });
}

export async function updateMedicine(req: Request, res: Response) {}
