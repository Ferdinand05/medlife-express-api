import { Router } from "express";
import { createMedicine, deleteMedicine, getMedicinesByUser, getMedicines, updateMedicine } from "../../controllers/admin/medicine.controller";

const router = Router();

// /medicines
router.get("/user/:userId", getMedicinesByUser);
router.route("/").get(getMedicines).post(createMedicine);
router.route("/:id").put(updateMedicine).delete(deleteMedicine);

export default router;
