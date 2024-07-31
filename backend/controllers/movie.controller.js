import { fetchFromTMDB } from "../services/tmdb.service.js";

export async function getTrendingMovies(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results?.length)]; // pick a random movie from the results

        res.json({ success: true, content: randomMovie});

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error"})
    }
}