import express from "express";
import { getTrendingTvs, getTvTrailers, getTvDetails, getSimilarTvs, getTvsByCategory } from "../controllers/tv.controller.js";

const router = express.Router();

router.get("/trending",getTrendingTvs);
router.get("/:id/trailers", getTvTrailers);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTvs);
router.get("/:category", getTvsByCategory);

export default router;