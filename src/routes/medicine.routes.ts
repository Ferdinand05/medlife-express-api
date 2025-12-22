import { Router } from "express";
import { createMedicine, deleteMedicine, getMedicinesByUser, getMedicines, updateMedicine } from "../controllers/medicine.controller";

const router = Router();

router.get("/user/:userId", getMedicinesByUser);

router.route("/").get(getMedicines).post(createMedicine);
router.route("/:id").put(updateMedicine).delete(deleteMedicine);

export default router;
