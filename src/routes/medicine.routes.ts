import { Router } from "express";
import { createMedicine, deleteMedicine, getMedicinesByUser, getMedicines, updateMedicine } from "../controllers/medicine.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

// middleware
router.use(authMiddleware);

router.get("/user/:userId", getMedicinesByUser);
router.route("/").get(getMedicines).post(createMedicine);
router.route("/:id").put(updateMedicine).delete(deleteMedicine);

export default router;
