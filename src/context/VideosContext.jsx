import { createContext, useContext, useEffect, useReducer } from "react";
import { reducer } from "./reducer";
import { videos } from "../data/videos";

const videosContext = createContext();

export const VideosContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    allVideos: localStorage.getItem("allVideos")
      ? JSON.parse(localStorage.getItem("allVideos"))
      : [],
    playlists: localStorage.getItem("playlists")
      ? JSON.parse(localStorage.getItem("playlists"))
      : [],
  });

  useEffect(() => {
    if (state.allVideos.length < 1 && state.playlists.length < 1) {
      localStorage.setItem("allVideos", JSON.stringify(videos));
      localStorage.setItem(
        "playlists",
        JSON.stringify([
          {
            title: "Favourites",
            videos: [],
          },
        ])
      );
      dispatch({ type: "dataSetter" });
    } else {
      localStorage.setItem("allVideos", JSON.stringify(state.allVideos));
      localStorage.setItem("playlists", JSON.stringify(state.playlists));
    }
  }, [state]);

  return (
    <videosContext.Provider value={{ state, dispatch }}>
      {children}
    </videosContext.Provider>
  );
};

export const useVideosContext = () => useContext(videosContext);
