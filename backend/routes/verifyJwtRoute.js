import express from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();

// Create a POST route to verify the token
router.post("/verify-token", verifyJWT);

export default router;