import express from "express";
import { getTrendingMovies, getMovieTrailers, getMovieDetails } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending",getTrendingMovies);
router.get("/:id/trailers", getMovieTrailers);
router.get("/:id/details", getMovieDetails);

export default router;