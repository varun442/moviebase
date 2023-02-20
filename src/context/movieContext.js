import axios from "axios";
import React, { createContext, useEffect, useContext, useState } from "react";
import { baseUrl } from "../config/data";
import { image_url } from "../config/data";
const movieContext = createContext();

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
      axios(`${baseUrl}/movie/top_rated?api_key=${process.env.REACT_APP_API_KEY}`),
      axios(
        `${baseUrl}/movie/now_playing?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`
      ),
      axios(`${baseUrl}/trending/movie/day?api_key=${process.env.REACT_APP_API_KEY}`),
      axios(`${baseUrl}/tv/airing_today?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`),
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
