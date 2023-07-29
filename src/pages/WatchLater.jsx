import React from "react";
import { useVideoCategoryFilter } from "../Hooks/useVideoCategoryFilter";
import { useVideosContext } from "../context/VideosContext";
import VideoCard from "../components/VideoCard";

const WatchLater = () => {
  const {
    state: { allVideos },
  } = useVideosContext();

  const videosData = useVideoCategoryFilter("watchLater", true, allVideos);
  return (
    <div className="videosPage">
      <h1>WatchLater</h1>
      <section className="videosSection">
        {videosData.map((video) => (
          <VideoCard data={video} key={video._id} />
        ))}
      </section>
    </div>
  );
};

export default WatchLater;
