import express from "express";
import { create, findAll, topNews, findById } from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.meddleware.js";

const router = express.Router();

router.post("/",authMiddleware, create);
router.get("/",findAll);
router.get("/top", topNews);
router.get("/:id", findById);

export default router;