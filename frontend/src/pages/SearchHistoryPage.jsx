import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

const SearchHistoryPage = () => {
    const [searchHistory, setSearchHistory] = useState([]);

    useEffect(() => {
        const getSearchHistory = async () => {
            try{
                const res = await axios.get("http://localhost:5020/api/v1/search/history", {withCredentials: true});
                setSearchHistory(res.data.history);
            } catch (err) {
                console.log(err.message);
                setSearchHistory([]);  
            }
        };
        getSearchHistory();
    }, []);

if (searchHistory?.length === 0) {
  return (
    <div className="bg-black min-h-screen text-white">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Search History</h1>
      </div>
    </div>
  )
}
}

export default SearchHistoryPage
