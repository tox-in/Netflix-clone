import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactPlayer from "react-player";

const WatchPage = () => {
    const { id } = useParams();
    const [trailers, setTrailers] = useState([]);
    const [similarContent, setSimilarContent] = useState([]);
    const [currentTrailerIdx, setCurrentTrailerIdx] = useState(0);
    const [loading, setLoading] = useState(true);
    const [content, setContent] = useState({});
    const {contentType} = useContentStore();

    useEffect(() => {
        const getTrailers = async () => {
            try {
            const res = await axios.get(`http://localhost:5020/api/v1/${contentType}/${id}/trailers`, {withCredentials:true});
            setTrailers(res.data.trailers);
            } catch (error) {
                if(error.message.includes('404')){
                    setTrailers([]) ;
                }
            }
        }
        getTrailers();
    }, [contentType,id]);

    console.log(trailers);

    useEffect(() => {
        const getSimilarContent = async () => {
            try {
                const res = await axios.get(`http://localhost:5020/api/v1/${contentType}/${id}/similar`, {withCredentials:true});
            
                setSimilarContent(res.data.similar);
            } catch (error) {
                if(error.message.includes('404')){
                    setSimilarContent([]) ;
                }
            }
        };
        getSimilarContent();
    }, [contentType,id]);

    console.log("similar content", similarContent);
    
    useEffect(() => {
        const getContentDetails = async () => {
            try {
                const res = await axios.get(`http://localhost:5020/api/v1/${contentType}/${id}/details`, {withCredentials:true});
            
                setContent(res.data.content);
            } catch (error) {
                if(error.message.includes('404')){
                    setContent([]) ;
                }
            }
        };
        getContentDetails();
    }, [contentType,id]);

    console.log("contentDetails", content);

    const handleNext = () => {
        if (currentTrailerIdx < trailers.length - 1)
            setCurrentTrailerIdx(currentTrailerIdx + 1);
    }
    const handlePrev = () => {
        if (currentTrailerIdx > 0)
        setCurrentTrailerIdx(currentTrailerIdx - 1)
    }
  return (
    <div className='bg-black min-h-screen text-white'>
      <div className="mx-auto container px-4 py-8 h-full">
        <Navbar />

        {trailers.length > 0 && (
            <div className="flex justify-between items-center mb-4">
                <button className={`
                    bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === 0 ? 
                    'opacity-50 cursor-not-allowed' : ""}
                    `}
                    disabled={currentTrailerIdx === 0}
                    onClick={handlePrev}
                    >
                    <ChevronLeft size={24} />
                </button>

                <button className={`
                    bg-gray-500/70 hover:bg-gray-500 text-white py-2 px-4 rounded ${currentTrailerIdx === trailers.length - 1 ? 
                    'cursor-not-allowed opacity-50' : ""}
                    `}
                    disabled={currentTrailerIdx === trailers.length -1 }
                    onClick={handleNext}
                    >
                    <ChevronRight size={24} />
                </button>
            </div>
        )}

        <div className="aspect-video mb-8 p-2 sm:px-10 md:px-32">
            {trailers.length > 0 && (
                <ReactPlayer 
                controls = {true}
                    width = {"100%"}
                    height={"70vh"}
                    className="mx-auto overflow-hidden rounded-lg"
                    url={`https://www.youtube.com/watch?v=${trailers[currentTrailerIdx].key}`}
                />
            )}
        </div>

      </div>
    </div>
  )
}

export default WatchPage
