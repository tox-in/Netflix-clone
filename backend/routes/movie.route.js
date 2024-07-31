import express from "express";
import { getTrendingMovies, getMovieTrailers, getMovieDetails, getSimilarMovies } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending",getTrendingMovies);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);

export default router;