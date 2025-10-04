import express from "express";
import { sendEmailTask } from "../controllers/emailController.js";

const router = express.Router();

router.post("/", sendEmailTask);

export default router;