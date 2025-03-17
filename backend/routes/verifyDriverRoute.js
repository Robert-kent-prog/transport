import express from "express";
import { verifyDriver } from "../middleware/verifyDriver.js";

const router = express.Router();

// Create a POST route to verify the token
router.post("/verify-driver", verifyDriver);

export default router;