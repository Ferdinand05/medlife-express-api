import { Response, Request } from "express";
import Category from "../../models/Category";
import { ICategory } from "../../types/category";
import z from "zod";
import { formatZodErrors } from "../../utils/formatZodError";
//
export async function getCategories(req: Request, res: Response) {
  const categories: ICategory[] = await Category.find();

  return res.status(200).json({
    data: categories,
  });
}

export async function createCategory(req: Request, res: Response) {
  const validation = z.object({
    name: z.string().min(2).trim(),
  });

  const parse = validation.safeParse(req.body);

  if (!parse.success) {
    return res.status(400).json({
      error: parse.error,
    });
  }

  const { name } = parse.data;

  try {
    const category = await Category.create({
      name: name,
    });

    return res.status(201).json({
      message: "Data created successfully.",
      category: category,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}

export async function updateCategory(req: Request, res: Response) {
  const paramsSchema = z.object({
    id: z.string().length(24),
  });

  const bodySchema = z.object({
    name: z.string().min(2),
  });

  const parseParams = paramsSchema.safeParse(req.params);
  const parseBody = bodySchema.safeParse(req.body);

  if (!parseParams.success || !parseBody.success) {
    return res.status(400).json({
      error: "Invalid format data",
    });
  }
  const { id } = parseParams.data;
  const { name } = parseBody.data;

  try {
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name: name,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        error: "Category not found",
      });
    }

    return res.status(200).json({
      message: "Data updated successfully.",
      category: category,
    });
  } catch (err) {
    return res.status(500).json({
      error: err,
    });
  }
}

export async function deleteCategory(req: Request, res: Response) {
  const validation = z.object({
    id: z.string().length(24),
  });

  const parse = validation.safeParse(req.params);

  if (!parse.success) return res.status(400).json({ error: formatZodErrors(parse.error) });

  const { id } = parse.data;

  const find = await Category.findById(id);

  if (!find) return res.status(404).json({ error: "Data not found" });

  await find.deleteOne();

  return res.status(200).json({
    message: "Data deleted successfully.",
    category: find,
  });
}
