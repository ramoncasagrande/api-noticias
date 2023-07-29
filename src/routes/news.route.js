import express from "express";
import { create, findAll } from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.meddleware.js";

const router = express.Router();

router.post("/",authMiddleware, create);
router.get("/",findAll);

export default router;