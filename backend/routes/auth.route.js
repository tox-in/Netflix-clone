import express from "express";
import { protectRoute } from "../middleware/protectRoute.js";
import { login, logout, signup, authCheck } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

router.get("/authCheck", protectRoute, authCheck)

export default router;