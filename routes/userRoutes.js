import express from "express";
import { Router } from "express";

import { signup } from "../controllers/userControllers.js";

const router = Router();

router.route("/signup").post(signup);

export default router;