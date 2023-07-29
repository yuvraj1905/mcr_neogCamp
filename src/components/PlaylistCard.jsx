import React from "react";
import "../styles/playlists.css";
import { AiFillDelete } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useVideosContext } from "../context/VideosContext";

const PlaylistCard = ({ data }) => {
  const { title, videos } = data;
  const navigate = useNavigate();
  const { dispatch } = useVideosContext();
  return (
    <div className="playlistCard">
      <img
        className="cursorPointer"
        onClick={() => navigate(`/playlistVids/${title}`)}
        src="https://previews.123rf.com/images/samui88/samui881901/samui88190100003/126480212-my-playlist-stylized-hand-drawn-vector-lettering-musical-disk-cartoon-clipart-grunge-blue.jpg"
        alt=""
      />
      <h2
        onClick={() => navigate(`/playlistVids/${title}`)}
        className="cursorPointer"
        style={{
          textAlign: "center",
          padding: "4px",
          backgroundColor: "#509ecf",
          color: "white",
        }}
      >
        {title}
      </h2>
      <AiFillDelete
        onClick={() => {
          dispatch({ type: "playlistRemover", payload: title });
        }}
        className="deletePlaylistBtn"
        size={30}
        color="red"
      />
    </div>
  );
};

export default PlaylistCard;
