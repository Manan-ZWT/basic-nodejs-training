// IMPORTING REQUIRED MODULES AND FILES
import express from "express";
import { verifyToken } from "../middlewares/jwtAuth.js";
import { verifyRole } from "../middlewares/validateRole.js";
import { placeOrder } from "../validators/orderValidator.js";

// CREATING ROUTES FOR "/user" REQUEST
const router = express.Router();
router.get("/", verifyToken, verifyRole("customer"));
router.post("/", verifyToken, verifyRole("customer"), placeOrder);
router.get("/:id", verifyToken, verifyRole("customer"));
router.get("/:id/status", verifyToken, verifyRole("admin"));

export default router;
