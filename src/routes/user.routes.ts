import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller";

const router = Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);
export default router;
