import express from "express";
import { create, findAll } from "../controllers/news.controller.js"

const router = express.Router();

router.post("/", create);
router.get("/",findAll);

export default router;