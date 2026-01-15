import { Request, Response } from "express";
import { ICategory } from "../../types/category";
import Category from "../../models/Category";
export async function getAllCategories(req: Request, res: Response) {
  const categories: ICategory[] = await Category.find();

  return res.status(200).json({
    data: categories,
  });
}
