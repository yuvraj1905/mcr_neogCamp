import React from "react";
import { useParams } from "react-router-dom";
import { useVideoCategoryFilter } from "../Hooks/useVideoCategoryFilter";
import VideoCard from "../components/VideoCard";
import { useVideosContext } from "../context/VideosContext";
import "../styles/videosPage.css";

const VideosPage = () => {
  const { category } = useParams();
  const {
    state: { allVideos },
  } = useVideosContext();
  const videosData = useVideoCategoryFilter("category", category, allVideos);
  return (
    <div className="videosPage">
      <h1>{category} videos</h1>
      <section className="videosSection">
        {videosData?.map((video) => (
          <VideoCard data={video} key={video._id} />
        ))}
      </section>
    </div>
  );
};

export default VideosPage;
