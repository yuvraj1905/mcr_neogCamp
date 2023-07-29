import React, { useState } from "react";
import { BiTimeFive } from "react-icons/bi";
import { MdOutlineEditNote, MdPlaylistAdd, MdWatchLater } from "react-icons/md";
import { useVideosContext } from "../context/VideosContext";
import PlaylistModal from "./PlaylistModal";

const DetailsCard = ({ data }) => {
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
    notes,
  } = data;
  const { dispatch } = useVideosContext();
  const [showModal, setShowModal] = useState(false);
  const [playlist, setSelectedPlaylist] = useState([]);
  const {
    state: { playlists },
  } = useVideosContext();

  const playlistList = playlists.map(({ title }) => title);
  const [showPlaylistOptions, setshowPlaylistOptions] = useState(false);

  return (
    <div className="detailsCard">
      <iframe
        className="iframeVideo"
        height={400}
        src={src}
        title={title}
      ></iframe>
      <section className="videoControls">
        <span>
          <img
            src="https://cdn-icons-png.flaticon.com/512/3670/3670163.png"
            alt=""
            className="dp"
          />
        </span>
        <section className="videoControlsBtns">
          <h3>{title}</h3>
          <section className="btns">
            <span
              onClick={() =>
                dispatch({
                  type: "watchLaterChanger",
                  payload: [watchLater, _id],
                })
              }
            >
              {watchLater ? (
                <MdWatchLater size={24} cursor="pointer" />
              ) : (
                <BiTimeFive cursor="pointer" size={24} />
              )}
            </span>
            <MdPlaylistAdd
              className="cursorPointer"
              onClick={() => setshowPlaylistOptions(!showPlaylistOptions)}
              size={24}
            />
            <MdOutlineEditNote
              className="cursorPointer"
              size={24}
              onClick={() => setShowModal(true)}
            />
            <ul
              className="playlistsList"
              style={{ display: !showPlaylistOptions ? "none" : "" }}
            >
              {playlistList?.map((list) => {
                const isInPlaylist = playlists.find(
                  ({ title, videos }) =>
                    title === list && videos.find((vid) => vid._id === _id)
                );
                return (
                  <li
                    onClick={() => {
                      dispatch({
                        type: "playlistVideoAdder",
                        payload: [list, data],
                      });
                    }}
                    className={isInPlaylist ? "list tick" : "list"}
                  >
                    {list}
                  </li>
                );
              })}
            </ul>
            <section
              className="modal"
              style={{ display: !showModal ? "none" : "" }}
            >
              {<PlaylistModal fn={setShowModal} />}
            </section>
          </section>
        </section>
      </section>

      <section>
        <h2>My notes</h2>
        <button>Add notes</button>
        {notes?.length < 1 ? (
          <h3>No notes on this video</h3>
        ) : (
          <section>
            {notes?.map((note) => (
              <section>
                <p>{note}</p>
                <button>edit</button>
                <button>delete</button>
              </section>
            ))}
          </section>
        )}
      </section>
    </div>
  );
};

export default DetailsCard;
