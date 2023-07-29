import React, { useState } from "react";
import { useVideosContext } from "../context/VideosContext";
import PlaylistCard from "../components/PlaylistCard";
import PlaylistModal from "../components/PlaylistModal";
import "../styles/playlists.css";

const Playlist = () => {
  const {
    state: { playlists },
  } = useVideosContext();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={showModal ? "videosPage blur" : "videosPage"}>
        <h1>Playlists</h1>
        <button className="boxShadowBtn" onClick={() => setShowModal(true)}>
          Create new playlist
        </button>

        {playlists.length > 0 ? (
          <section className="videosSection">
            {playlists?.map((playlist) => (
              <PlaylistCard data={playlist} />
            ))}
          </section>
        ) : (
          <h2>No playlists</h2>
        )}
      </div>
      <section className="modal" style={{ display: !showModal ? "none" : "" }}>
        {<PlaylistModal fn={setShowModal} />}
      </section>
    </>
  );
};

export default Playlist;
