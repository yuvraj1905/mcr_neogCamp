import React from "react";
import { useParams } from "react-router-dom";
import { useVideoCategoryFilter } from "../Hooks/useVideoCategoryFilter";
import { useVideosContext } from "../context/VideosContext";
import DetailsCard from "../components/DetailsCard";
import "../styles/DetailPage.css";
import VideoCard from "../components/VideoCard";

const DetailsPage = () => {
  const {
    state: { allVideos },
  } = useVideosContext();
  const { videoId } = useParams();
  const videoData = useVideoCategoryFilter(
    "_id",
    Number(videoId),
    allVideos
  )[0];
  const suggestedVids = allVideos?.filter(({ _id }) => _id != videoId);
  return (
    <div className="DetailsPage">
      <section className="actualVideo">
        <DetailsCard data={videoData} />
      </section>
      <section className="suggestedVids">
        <h3>More videos</h3>
        <section>
          {suggestedVids?.map((vid) => (
            <VideoCard data={vid} key={vid._id} suggested />
          ))}
        </section>
      </section>
    </div>
  );
};

export default DetailsPage;
