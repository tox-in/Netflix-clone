import { useContentStore } from "../store/content";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();

    const formattedCategoryName = category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    return <div className="bg-black text-white relative px-5 md:px-20">
        <h2>
            { formattedCategoryName } { formattedContentType }
        </h2>
    </div>
}

export default MovieSlider;