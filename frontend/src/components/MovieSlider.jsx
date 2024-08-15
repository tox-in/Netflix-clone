import { useEffect, useState } from "react";
import { useContentStore } from "../store/content";
import { Link } from "react-router-dom";
import { SMALL_IMG_BASE_URL } from "../constants/constants";
import axios from "axios";

const MovieSlider = ({ category }) => {
    const { contentType } = useContentStore();
    const [content, setContent] = useState([])

    const formattedCategoryName = category.replaceAll("_"," ")[0].toUpperCase() + category.replaceAll("_", " ").slice(1);

    useEffect(() => {
        const getContent = async () => {
            const res = await axios.get(`http://localhost:5020/api/v1/${contentType}/${category}`, {withCredentials:true})
            setContent(res.data.content)
        }
        getContent()
    },[contentType,category])

    const formattedContentType = contentType === "movie" ? "Movies" : "TV Shows";

    return <div className="bg-black text-white relative px-5 md:px-20">
        <h2>
            { formattedCategoryName } { formattedContentType }
        </h2>

        <div className="flex space-x-4 overflow-x-scroll">
            {content.map((item) => (
                <Link to={`/watch/${item.id}`} className="min-w-[250px] relative group" key={item.id}>
                    <div className="rounded-lg overflow-hidden">
                        <img src={SMALL_IMG_BASE_URL + item.backdrop_path} alt="MMovie image" className="transition-transform duration-300 ease-in-out group-hover:scale-125" />
                    </div>
                </Link>
            ))}
        </div>
    </div>
}

export default MovieSlider;