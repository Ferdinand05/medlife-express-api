import { Router } from "express";
import { authMiddleware } from "../../middleware/auth.middleware";
import userMedicineRoutes from "./medicine.routes";
import userRoutes from "./user.routes";
const router = Router();

router.use(authMiddleware);

// user routes
// /user
router.use("/medicines", userMedicineRoutes);
router.use("/", userRoutes);

export default router;
