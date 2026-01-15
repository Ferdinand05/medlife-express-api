import { Router } from "express";
import { getAllCategories } from "../../controllers/user/categories.controller";

const router = Router();

router.get("/categories", getAllCategories);

export default router;
