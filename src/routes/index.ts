import { Router } from "express";
import categoryRoutes from "./category.routes";
import medicineRoutes from "./medicine.routes";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
const router = Router();

router.use("/categories", categoryRoutes);
router.use("/medicines", medicineRoutes);
router.use("/users", userRoutes);
router.use("/", authRoutes);
export default router;
