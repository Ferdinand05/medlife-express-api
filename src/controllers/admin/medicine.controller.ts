import { Request, Response } from "express";
import { Types } from "mongoose";
import Medicine from "../../models/Medicine";
import User from "../../models/User";
import z from "zod";
import { IMedicine } from "../../types/medicine";
import { formatZodErrors } from "../../utils/formatZodError";

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
    unit: z.enum(["tablet", "strip", "ml", "bottle"]),
    expireDate: z.coerce.date(),
    note: z.string().optional(),
    user: z.string(),
    category: z.string(),
  });

  const parsed = medicineSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: formatZodErrors(parsed.error) });

  const { name, quantity, unit, expireDate, user, note, category } = parsed.data;

  if (!Types.ObjectId.isValid(user)) return res.status(400).json({ error: "User Id is not valid" });
  if (!Types.ObjectId.isValid(category)) return res.status(400).json({ error: "Category Id is not valid" });

  try {
    const newMedicine = await Medicine.create({ name, quantity, unit, expireDate, note, user, category });

    return res.status(201).json({
      success: "Data created successfully.",
      medicine: newMedicine,
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
}

export async function updateMedicine(req: Request, res: Response) {
  const { id } = req.params;

  const medicineSchema = z.object({
    name: z.string().min(2),
    quantity: z.number().min(0),
    unit: z.enum(["tablet", "strip", "ml", "bottle"]),
    expireDate: z.coerce.date(),
    note: z.string().optional(),
    user: z.string().length(24),
    category: z.string().length(24),
  });

  const parsed = medicineSchema.safeParse(req.body);

  if (!parsed.success) return res.status(400).json({ error: formatZodErrors(parsed.error) })  
  if(!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid Id or Format data" });


  const { name, category, quantity, unit, expireDate, user, note } = parsed.data;

  const medicine = await Medicine.findByIdAndUpdate(
    id,
    {
      name,
      quantity,
      unit,
      expireDate,
      note,
      user,
      category,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  if (medicine == null) return res.status(401).json({ error: "Medicine not found" });

  return res.status(200).json({
    success: "Data Updated successfully.",
    medicine: medicine,
  });
}

export async function deleteMedicine(req: Request, res: Response) {
  const { id } = req.params;

  if (!Types.ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid ID" });

  const deleted = await Medicine.findByIdAndDelete(id);

  if (deleted == null) return res.status(404).json({ error: "Medicine not found" });

  return res.status(200).json({
    success: "Data has been deleted!",
  });
}

// get medicine by user id (user medicines)

export async function getMedicinesByUser(req: Request, res: Response) {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) return res.status(400).json({ error: "Invalid user id" });

  // 1 = ascending dan -1 = descending
  const user = await User.findById(userId);
  const userMedicines = await Medicine.find({ user: userId }).populate("category", "name").sort({ expireDate: 1 });

  if (userMedicines.length == 0) return res.status(200).json({ data: [] });

  return res.status(200).json({
    user,
    medicines: userMedicines,
  });
}
