import { Router } from "express";
import { createCategory, deleteCategory, getCategories, updateCategory } from "../../controllers/admin/category.controller";

const router = Router();

// /categories
router.route("/").get(getCategories).post(createCategory);
router.route("/:id").put(updateCategory).delete(deleteCategory);

export default router;
