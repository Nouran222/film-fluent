import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';


//custom hook to fetch movies
const fetchMovies = async(filter)=>{
    const urls ={
        popular: "https://api.themoviedb.org/3/movie/popular?api_key=00f378e7895b0d9b5b8653e265d683e1",
        top_rated: "https://api.themoviedb.org/3/movie/top_rated?api_key=00f378e7895b0d9b5b8653e265d683e1",
        upcoming: "https://api.themoviedb.org/3/movie/upcoming?api_key=00f378e7895b0d9b5b8653e265d683e1",
        now_playing: "https://api.themoviedb.org/3/movie/now_playing?api_key=00f378e7895b0d9b5b8653e265d683e1"
    };
    const res = await axios.get(urls[filter]);
    return res.data.results;
};

export const getMovies = (filter)=>{
    return useQuery({
        queryKey: ['movies', filter],
        queryFn: () => fetchMovies(filter),
        keepPreviousData: true,
    });
}