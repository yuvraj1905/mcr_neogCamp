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
  const [showNewNoteAdd, setshowNewNoteAdd] = useState(false);
  // const [playlist, setSelectedPlaylist] = useState([]);
  const {
    state: { playlists },
  } = useVideosContext();

  const playlistList = playlists.map(({ title }) => title);
  const [showPlaylistOptions, setshowPlaylistOptions] = useState(false);

  const [newNoteInput, setNewNoteInput] = useState("");
  const [edit, setEdit] = useState(false);
  const [prev, setPrev] = useState("");

  return (
    <>
      <div
        className={
          showModal || showNewNoteAdd ? "detailsCard blur" : "detailsCard"
        }
      >
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
            </section>
          </section>
        </section>

        <section>
          <h2 style={{ marginBottom: "1rem" }}>My notes</h2>
          <button onClick={() => setshowNewNoteAdd(true)}>Add notes</button>

          {notes?.length < 1 ? (
            <h3>No notes on this video</h3>
          ) : (
            <section>
              {notes?.map((note) => (
                <section style={{ marginTop: "1rem" }}>
                  <p>{note}</p>
                  <button
                    onClick={() => {
                      setEdit(true);
                      setPrev(note);
                      setNewNoteInput(note);
                      setshowNewNoteAdd(true);
                    }}
                  >
                    edit
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "noteDelete", payload: [note, _id] });
                    }}
                  >
                    delete
                  </button>
                </section>
              ))}
            </section>
          )}
        </section>
      </div>
      <section
        className="addNewNoteModal"
        style={{ display: !showNewNoteAdd ? "none" : "" }}
      >
        <h3>Add new note</h3>
        <input
          type="text"
          value={newNoteInput}
          onChange={(e) => setNewNoteInput(e.target.value)}
          placeholder="enter new note"
        />
        {!edit ? (
          <button
            onClick={() => {
              dispatch({ type: "noteAdd", payload: [newNoteInput, _id] });
              setshowNewNoteAdd(false);
              setNewNoteInput("");
            }}
          >
            Add
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch({
                type: "noteUpdate",
                payload: [prev, newNoteInput, _id],
              });
              setPrev("");
              setEdit("");
              setshowNewNoteAdd(false);
              setNewNoteInput("");
            }}
          >
            Update
          </button>
        )}
        <button
          onClick={() => {
            setPrev("");
            setEdit("");
            setshowNewNoteAdd(false);
            setNewNoteInput("");
          }}
        >
          Cancel
        </button>
      </section>
      <section className="modal" style={{ display: !showModal ? "none" : "" }}>
        {<PlaylistModal fn={setShowModal} />}
      </section>
    </>
  );
};

export default DetailsCard;
