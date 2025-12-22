import { Router } from "express";
import { createMedicine, deleteMedicine, getMedicines, updateMedicine } from "../controllers/medicine.controller";

const router = Router();

router.route("/").get(getMedicines).post(createMedicine);
router.route("/:id").put(updateMedicine).delete(deleteMedicine);
export default router;
