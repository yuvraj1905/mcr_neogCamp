import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useVideosContext } from "../context/VideosContext";

import VideoCard from "../components/VideoCard";

const PlaylistVideos = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const {
    state: { playlists },
  } = useVideosContext();
  const videosData = playlists.find(({ title }) => title === name).videos;
  return (
    <div className="videosPage">
      <h1>{videosData?.name} Videos</h1>

      <section className="videosSection">
        {videosData?.length > 0 ? (
          videosData?.map((video) => (
            <VideoCard playlist={name} data={video} key={video._id} />
          ))
        ) : (
          <h1>
            No videos in this playlist.{" "}
            <span
              onClick={() => navigate("/explore")}
              style={{
                backgroundColor: "grey",
                color: "white",
                padding: "1px 4px",
              }}
              className="cursorPointer"
            >
              Click here
            </span>{" "}
            to explore videos and add them to your playlist
          </h1>
        )}
      </section>
    </div>
  );
};

export default PlaylistVideos;
