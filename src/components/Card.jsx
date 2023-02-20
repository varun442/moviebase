import React from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/movieContext";
import default_poster from "../assets/default_poster.jpg";

const Card = ({ id, poster_path, title, name }) => {
  const { getImage } = useGlobalState();
  return (
    <>
      <div className="card">
        <Link to={`/movie/${id}`}>
          <img
            src={poster_path ? getImage(poster_path, 500) : default_poster}
            alt={title}
          />
        </Link>
        <h4 className="name">{title || name}</h4>
      </div>
    </>
  );
};

export default Card;
