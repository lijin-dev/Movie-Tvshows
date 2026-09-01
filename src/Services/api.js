import { data } from "react-router-dom";

const API_KEY = "63f828cfafdd35b4da12344f9ea9e2bf";
const BASE_URL = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => {
    const responses = await Promise.all([
        fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=1`),
        fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=2`)
    ]);

    responses.forEach((response) => {
        if (!response.ok) {
            throw new Error(`TMDB request failed: ${response.status}`);
        }
    });

    const pages = await Promise.all(responses.map((response) => response.json()));
    return pages.flatMap((page) => page.results).slice(0, 35);
}

export const searchMovies = async (query) => {
    const response = await fetch(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
        throw new Error(`TMDB search failed: ${response.status}`);
    }

    const data = await response.json();
    return data.results;
}


export const getMovieById = async (id) =>{
    const response = await fetch(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);

    if (!response.ok) {
        throw new Error(`TMDB movie request failed: ${response.status}`);
    }

    const data = await response.json();
    return data;
}

export const getMovieActors = async (id) =>{
    const response = await fetch(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`);
    const data = await response.json();
    return data.cast;
}

export const getSimilarMovies = async (id) =>{
    const response = await fetch(`${BASE_URL}/movie/${id}/similar?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results
}

export const getMovieTrailer = async (id) =>{
    const response = await fetch(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results
}

export const getPopularTvSeries = async () => {
    const responses = await Promise.all([
        fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=1`),
        fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&page=2`)
    ]);

    responses.forEach((response) => {
        if (!response.ok) {
            throw new Error(`TMDB request failed: ${response.status}`);
        }
    });

    const pages = await Promise.all(responses.map((response) => response.json()));
    return pages.flatMap((page) => page.results).slice(0, 35);
}

export const searchTvSeries = async (query) =>{
    const response = await fetch(`${BASE_URL}/search/tv?api_key=${API_KEY}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results
}

export const getTvById = async (id) =>{
    const response = await fetch(`${BASE_URL}/tv/${id}?api_key=${API_KEY}`);
    const data = await response.json();
    return data;
}

export const getTvCast = async (id) =>{
    const response = await fetch(`${BASE_URL}/tv/${id}/credits?api_key=${API_KEY}`);
    if (!response.ok) {
        throw new Error(`TMDB TV credits request failed: ${response.status}`);
    }
    const data = await response.json();
    return data.cast ?? data.results ?? [];
}

export const getSimilarTvSeries = async (id) =>{
    const response = await fetch(`${BASE_URL}/tv/${id}/similar?api_key=${API_KEY}`);
    const data = await response.json();
    return data.results;
}

export const getTvTrailer = async(id) =>{
    const response = await fetch(`${BASE_URL}/tv/${id}/videos?api_key=${API_KEY}`)
    const data = await response.json();
    return data.results;
}

// export const getPopularTvSeries = async () =>{
//     const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results
// }

// individuals

// export const getMovieTopImdb = async () =>{
//     const response = await fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results;
// }

// export const getTvTopImdb = async() =>{
//     const response = await fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}`);
//     const data = await response.json();
//     return data.results;
// }

export const getTopRatedAll = async (page = 1) => {
    const [movieResponse, tvResponse] = await Promise.all([
        fetch(`${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`),
        fetch(`${BASE_URL}/tv/top_rated?api_key=${API_KEY}&page=${page}`)
    ]);

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    const movies = movieData.results.map((movie) => ({
        ...movie,
        type: "movie"
    }));

    const tvShows = tvData.results.map((show) => ({
        ...show,
        type: "tv"
    }));

    return [...movies, ...tvShows];
};


export const getLatestMovieTV = async (page = 1) =>{
    const [movieResponse, tvResponse] = await Promise.all([
        fetch(`${BASE_URL}/movie/now_playing?api_key=${API_KEY}&page=${page}`),
        fetch(`${BASE_URL}/tv/on_the_air?api_key=${API_KEY}&page=${page}`)
    ]);

    const movieData = await movieResponse.json();
    const tvData = await tvResponse.json();

    const movieMap = movieData.results.map((data) =>({
        ...data,
        type:'movie'
    }));

    const tvMap = tvData.results.map((value) =>({
        ...value,
        type:"tv"
    }));

    return [...movieMap, ...tvMap];
}