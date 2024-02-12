import express from "express";
import {
  handleRegister,
  handleLogin,
  handleLoginNoCookie,
  emailconfirm,
  forgotPass,
  changePass,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", handleRegister);
router.post("/login", handleLogin);
router.post("/loginNoCookie", handleLoginNoCookie);
router.post("/emailconfirm/:token", emailconfirm);
router.post("/forgotPass", forgotPass);
router.patch("/changePass", changePass);

export default router;
