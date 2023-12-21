import express from "express";
import {upload} from "../aws/awsConfig.js"
import { loginController } from "../controllers/authControllers/loginController.js";
import { createUserFcn } from "../controllers/authControllers/createUser.js";
import { validateRegister } from "../validators/registerValidator.js";
import { validationErrors } from "../midleWares/validationErrors.js";
import { getProfileInfoController } from "../controllers/authControllers/getProfileInfoController.js";
import { verifyToken } from "../midleWares/verifyToken.js";
import { changeUserController } from "../controllers/authControllers/changeUserController.js";
import { verifyEmailController } from "../controllers/authControllers/verifyEmailController.js";
const router = express.Router();

router.post("/login", loginController);
router.post("/create-user",validateRegister,validationErrors, createUserFcn);
router.get("/get/user" ,verifyToken ,getProfileInfoController  )
router.get("/verify-email/:token" , verifyEmailController)
router.patch("/change-user/:id",upload.single("image"),changeUserController)
export default router;
