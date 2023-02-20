import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";

const movieContext = createContext();

// api urls for getting the movie
const baseUrl = "https://api.themoviedb.org/3";
const api_key = "a050af4c5354d8e3d4d8d50330fb50d9";
const image_url = "https://image.tmdb.org/t/p";

const AppProvider = ({ children }) => {
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [trendingTVSeries, setTrendingTVSeries] = useState([]);
  const [isPlayerModalOpen, setIsPlayerModalOpen] = useState(false);
  const getMovies = async () => {
    setIsLoading(true);
    await Promise.allSettled([
      axios(`${baseUrl}/movie/top_rated?api_key=${api_key}`),
      axios(
        `${baseUrl}/movie/now_playing?api_key=${api_key}&language=en-US&page=1`
      ),
      axios(`${baseUrl}/trending/movie/day?api_key=${api_key}`),
      axios(`${baseUrl}/tv/airing_today?api_key=${api_key}&language=en-US`),
    ])
      .then((results) => {
        const [
          topRatedMovies,
          nowPlayingMovies,
          trendingMovie,
          trendingTVSeries,
        ] = results;
        const tenNowPlayingMovies = nowPlayingMovies.value.data.results.slice(
          0,
          10
        );
        const tenTrendingMovies = trendingMovie.value.data.results.slice(0, 10);
        const tenTrendingTVSeries = trendingTVSeries.value.data.results.slice(
          0,
          10
        );
        setIsLoading(false);
        setTopRatedMovies(topRatedMovies);
        setNowPlayingMovies(tenNowPlayingMovies);
        setTrendingMovie(tenTrendingMovies);
        setTrendingTVSeries(tenTrendingTVSeries);
      })
      .catch((error) => console.log(error));
  };
  const getImage = (path, size) => {
    return `${image_url}/w${size}${path}`;
  };
  console.log();
  useEffect(() => {
    getMovies();
  }, []);
  // console.log(trendingTVSeries);
  return (
    <movieContext.Provider
      value={{
        isLoading,
        topRatedMovies,
        nowPlayingMovies,
        trendingMovie,
        trendingTVSeries,
        getImage,
        isPlayerModalOpen,
        setIsPlayerModalOpen,
      }}
    >
      {children}
    </movieContext.Provider>
  );
};

export const useGlobalState = () => {
  return useContext(movieContext);
};

export default AppProvider;
