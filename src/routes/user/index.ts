import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import userMedicineRoutes from "./medicine.routes";
import userRoutes from "./user.routes";
import categoryRoutes from "./category.routes";
const router = Router();

router.use(authMiddleware);

// user routes
// /user
router.use("/medicines", userMedicineRoutes);
router.use("/", userRoutes);
router.use("/", categoryRoutes);

export default router;
