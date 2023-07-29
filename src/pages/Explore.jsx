import React, { useState } from "react";
import { useVideosContext } from "../context/VideosContext";
import VideoCard from "../components/VideoCard";

const Explore = () => {
  const {
    state: { allVideos },
  } = useVideosContext();

  const [searchText, setSearchText] = useState("");
  const filteredData = allVideos?.filter(({ title }) =>
    title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <div className="videosPage">
      <h1>Explore Page</h1>
      <input
        type="text"
        className="boxShadow"
        placeholder="search for a video by title"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <section className="videosSection">
        {filteredData?.map((video) => (
          <VideoCard data={video} key={video._id} />
        ))}
      </section>
    </div>
  );
};

export default Explore;
