import { ENV_VARS } from '../config/envVars.js';
import axios from 'axios';

fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1',options)
.then(res => res.json())
.then(json => console.log(json))
.catch(err => console.error('error:' + err));

export const fetchFromTMDB = async(url) =>{
    const options = {
     headers: {
        accept: 'application/json',
        Authorization: 'Bearer ' + ENV_VARS.TMDB_API_KEY
     }
    };

    const response = await axios.get(url, options);
    
}