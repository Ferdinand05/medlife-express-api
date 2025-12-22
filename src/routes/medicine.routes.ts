import { Router } from "express";
import { createMedicine, getMedicines } from "../controllers/medicine.controller";

const router = Router();

router.route("/").get(getMedicines).post(createMedicine);

export default router;
