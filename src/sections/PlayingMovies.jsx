import React from "react";
import { useGlobalState } from "../context/movieContext";
import Card from "../components/Card";
const PlayingMovies = () => {
  const { isLoading, nowPlayingMovies } = useGlobalState();

  return (
    <section className="movies playing">
      <div className="container">
        <div className="section-title">
          <h3>Movie playing in theaters</h3>
          <p>Movies that are currently playing in theaters.</p>
        </div>
        <div className="movies-card">
          {isLoading && <h3>...Loading</h3>}
          {nowPlayingMovies &&
            nowPlayingMovies.map((movie) => {
              return <Card key={movie.id} {...movie} />;
            })}
        </div>
      </div>
    </section>
  );
};

export default PlayingMovies;
