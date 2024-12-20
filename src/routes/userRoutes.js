import { Router } from "express";
import UserController from "../controllers/UserController.js";
import { authenticateToken } from "../middleware/auth.js";

const router = Router();

// Public routes
router.post("/register", UserController.register);
router.post("/login", UserController.login);

// Protected routes
router.get("/profile", authenticateToken, UserController.getProfile);

export default router;
