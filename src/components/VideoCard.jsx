import React from "react";
import { useVideosContext } from "../context/VideosContext";
import "../styles/videoCard.css";
import { useNavigate } from "react-router-dom";
import { RxCross1 } from "react-icons/rx";

const VideoCard = ({ data, suggested, playlist }) => {
  const { dispatch } = useVideosContext();
  const navigate = useNavigate();
  const {
    _id,
    title,
    views,
    chips,
    thumbnail,
    src,
    watchLater,
    category,
    creator,
  } = data;
  return (
    <div
      className={`${
        suggested ? "videoCard suggestedVideoCard" : "videoCard"
      } cursorPointer`}
      onClick={() => navigate(`/details/${_id}`)}
    >
      <section
        className={
          suggested ? "suggested__thumbnail__and__btn" : "thumbnail__and__btn"
        }
      >
        <img
          src={thumbnail}
          alt=""
          className={suggested ? "suggestedCardImg" : ""}
        />
        <button
          className="cursorPointer"
          onClick={(e) => {
            e.stopPropagation();

            dispatch({
              type: "watchLaterChanger",
              payload: [watchLater, _id],
            });
          }}
        >
          {watchLater ? "Remove from watch later" : "Add to watch later"}
        </button>
        {playlist && (
          <RxCross1
            onClick={(e) => {
              e.stopPropagation();
              dispatch({
                type: "playlistVideoAdder",
                payload: [playlist, data],
              });
            }}
            className="deletePlaylistBtn"
            size={30}
          />
        )}
      </section>
      <section className="miniDetails">
        <span style={{ display: suggested ? "none" : "" }}>
          <img
            className="dp"
            src="https://cdn-icons-png.flaticon.com/512/3670/3670163.png"
            alt=""
          />
        </span>
        <section className="actualMiniDetails">
          <h3>{title}</h3>
          <h3 style={{ color: "grey" }}>{category}</h3>
          <p>
            {views} views | {creator}
          </p>
        </section>
      </section>
    </div>
  );
};

export default VideoCard;
