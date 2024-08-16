import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useContentStore } from '../store/content';
import axios from 'axios';

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
    
    
  return (
    <div>
      Watch Page
    </div>
  )
}

export default WatchPage
