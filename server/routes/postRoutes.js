import express from "express";
import { addPost, getAll, handleLike } from "../controllers/postController.js";
import upload from "../middlewares/multerCloudinary.js";
import auth from "../middlewares/auth.js";
import authNoCookie from "../middlewares/authNoCookie.js";

const router = express.Router();

router.post("/add", upload.single("logo"), addPost);
router.get("/get/all", auth, getAll);
router.get("/get/allNoCookie", auth, getAll);
router.get("/get/one");
router.delete("/delete/one");
router.put("/like", handleLike);

export default router;
