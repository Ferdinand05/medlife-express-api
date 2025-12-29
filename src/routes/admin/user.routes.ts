import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../../controllers/admin/user.controller";

const router = Router();

// /users
router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);
export default router;
