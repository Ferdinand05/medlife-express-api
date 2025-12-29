import { Router } from "express";
import { createMedicine, deleteMedicine, getMedicines, updateMedicine } from "../../controllers/user/medicine.controller";

const router = Router();

// user medicine routes
// /medicines
router.route("/").get(getMedicines).post(createMedicine);
router.route("/:id").put(updateMedicine).delete(deleteMedicine);

export default router;
