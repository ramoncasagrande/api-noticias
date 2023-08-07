import express from "express";
import { create, findAll, topNews, findById, searchByTitle, findByUser } from "../controllers/news.controller.js"
import { authMiddleware } from "../middlewares/auth.meddleware.js";

const router = express.Router();

router.post("/", authMiddleware, create);
router.get("/",findAll);
router.get("/top", topNews);
router.get("/search", searchByTitle);
router.get("/byUser", authMiddleware, findByUser)
router.get("/:id", authMiddleware, findById);

export default router;