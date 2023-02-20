import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../context/movieContext";
import {
  AiFillStar,
  AiOutlineFieldTime,
  AiOutlineDollar,
  AiFillPlayCircle,
} from "react-icons/ai";
import { Chip } from "@mui/material";
import { BsCalendar2Date } from "react-icons/bs";
import { formate } from "../features/formatNumber";
import PlayerModal from "../components/PlayerModal";
import { movieUrl, api_key } from "../config/data";

const MovieDetails = () => {
  const page = useRef();

  const { getImage, isPlayerModalOpen, setIsPlayerModalOpen } =
    useGlobalState();
  const [movie, setMovie] = useState([]);
  const [videoID, setVideoID] = useState("");
  const { id } = useParams();

  const getMovieDetails = async () => {
    const url = `${movieUrl}${id}?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`;

    try {
      const info = await axios
        .get(url)
        .then((results) => setMovie(results.data));
    } catch (error) {
      console.log(error);
    }
  };

  const getTrailerDetails = async () => {
    const trailerUrl = `${movieUrl}${id}/videos?api_key=${process.env.REACT_APP_API_KEY}`;
    try {
      const videoInfo = await axios
        .get(trailerUrl)
        .then((results) => results.data);
      console.log(videoInfo);
      let videoData;
      videoInfo.results.filter((video) => {
        if (video.name === "Official Trailer") {
          videoData = video;
          return videoData;
        }
      });

      setVideoID(videoData?.key);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovieDetails();
    getTrailerDetails();
  }, [id, videoID]);
  // console.log(page);
  const handlePlayer = () => {
    setIsPlayerModalOpen(!isPlayerModalOpen);
  };
  console.log(isPlayerModalOpen);
  return (
    <>
      {isPlayerModalOpen && <PlayerModal id={videoID} />}
      <div ref={page} className="movie-details">
        <div
          className="backdrop_poster"
          style={{
            backgroundImage: `url(${
              movie.backdrop_path ? getImage(movie?.backdrop_path, 1280) : ""
            })`,
          }}
        ></div>
        <div className="container">
          <div className="detail-header">
            <div>
              <h1>{movie.title}</h1>
              <div className="categories">
                {movie.genres?.map((genre, index) => (
                  <Chip
                    style={{ margin: "2px 2px", color: "black" }}
                    label={genre.name}
                    variant="filled"
                    size="small"
                  />
                ))}
              </div>
              <div className="rating">
                <AiFillStar color="#FFC000" size={"1.5em"} />{" "}
                {movie.vote_average?.toFixed(2)} / 10 <b>Total Vote:</b>{" "}
                {movie.vote_count}
              </div>
            </div>
            <div style={{ display: "flex", gap: "15px" }}>
              <div className="icon-box">
                <div className="icon">
                  <BsCalendar2Date size={"1.4rem"} />
                </div>
                <div className="box-content">
                  <h4>Release Date</h4>
                  <p>{movie.release_date}</p>
                </div>
              </div>
              <div className="icon-box">
                <div className="icon">
                  <AiOutlineDollar size={"1.4rem"} />
                </div>
                <div className="box-content">
                  <h4>Budget</h4>
                  <p>
                    {" "}
                    {movie.budget === 0 ? "Unkown" : formate(movie.budget)}
                  </p>
                </div>
              </div>

              <div className="icon-box">
                <div className="icon">
                  <AiOutlineFieldTime size={"1.4em"} />
                </div>
                <div className="box-content">
                  <h4>Running Time</h4>
                  <p>{movie.runtime + " mins"}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="more-details">
            <div className="poster">
              <img
                src={movie.poster_path ? getImage(movie.poster_path, 500) : ""}
                alt={movie.title}
              />
            </div>
            <div className="details">
              <div>
                <h2>Tag Line</h2>
                <p>{movie.tagline}</p>
              </div>
              <div>
                <h4>Overview</h4>
                <p>{movie.overview}</p>
              </div>
              <div>
                <h4>Status</h4>
                <p>{movie.status}</p>
              </div>
              <div>
                <h4>Language</h4>
                {movie.spoken_languages?.map((language, index) => (
                  <p key={index}>{language.name}</p>
                ))}
              </div>
              <div>
                <h4>Adult</h4>
                <p>{movie.adult ? "Yes" : "No"}</p>
              </div>
            </div>
            <div>
              <div
                className="trailer"
                style={{
                  backgroundImage: `url(${
                    movie.backdrop_path
                      ? getImage(movie?.backdrop_path, 500)
                      : ""
                  })`,
                }}
              >
                <button
                  type="button"
                  className="play-btn"
                  onClick={handlePlayer}
                >
                  <AiFillPlayCircle size={50} />
                </button>
              </div>

              <div className="watchlist">
                <button className="btn-watchlist">Add to Watchlist</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
