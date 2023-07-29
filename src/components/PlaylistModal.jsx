import React, { useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useVideosContext } from "../context/VideosContext";

const PlaylistModal = ({ fn }) => {
  const { dispatch } = useVideosContext();
  const [inputName, setInputName] = useState("");
  const clearerFunction = () => {
    fn(false);
    setInputName("");
  };
  return (
    <>
      <RxCross1 size={30} className="cursorPointer" onClick={clearerFunction} />
      <h3>Add new playlist</h3>
      <input
        type="text"
        placeholder="playlist name"
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
      />
      <button
        onClick={() => {
          if (inputName.length > 0) {
            dispatch({ type: "playlistAdder", payload: inputName });
            clearerFunction();
          } else alert("please input a valid name");
        }}
        className="createPlaylist"
      >
        Create Playlist
      </button>
    </>
  );
};

export default PlaylistModal;
