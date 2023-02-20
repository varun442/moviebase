import React from "react";
import { useGlobalState } from "../context/movieContext";
import TvCard from "../components/TvCard";
const TvShows = () => {
  const { isLoading, trendingTVSeries } = useGlobalState();
  // console.log(trendingTVSeries);
  return (
    <section className="movies tv-shows">
      <div className="container">
        <div className="section-title">
          <h3>Tv Shows</h3>
          <p>TV shows airing right now.</p>
        </div>
        <div className="movies-card">
          {isLoading && <h3>...Loading</h3>}
          {trendingTVSeries.map((tvShow) => {
            return <TvCard key={tvShow.id} {...tvShow} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default TvShows;
