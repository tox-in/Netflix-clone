import express from "express";
import { getTrendingMovies, getMovieTrailers } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending",getTrendingMovies);
router.get("/:id/trailers", getMovieTrailers);

export default router;