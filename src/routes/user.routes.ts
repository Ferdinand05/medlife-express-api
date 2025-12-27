import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { isAdmin } from "../middleware/admin.middleware";

const router = Router();

router.use(authMiddleware, isAdmin);

router.route("/").get(getUsers).post(createUser);
router.route("/:id").put(updateUser).delete(deleteUser);
export default router;
