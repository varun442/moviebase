import React from "react";
import YouTube from "react-youtube";
import { useGlobalState } from "../context/movieContext";
const PlayerModal = ({ videoID }) => {
  const { setIsPlayerModalOpen } = useGlobalState();

  const opts = {
    width: "800",
    height: "550",
    playerVars: {
      autoplay: 1,
    },
  };
  return (
    <>
      <div className="player-modal">
        <span
          className="close-player"
          onClick={() => setIsPlayerModalOpen(false)}
        ></span>
        <YouTube className="player" opts={opts} videoId={videoID} />
      </div>
    </>
  );
};

export default PlayerModal;
