import { Router } from "express";
import { changePassword, getMe, updateUserInfo } from "../../controllers/user/user.controller";

const router = Router();

router.route("/me").get(getMe).put(updateUserInfo);
router.put("/change-password", changePassword);
export default router;
