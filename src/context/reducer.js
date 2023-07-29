import { videos } from "../data/videos";

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case "dataSetter": {
      return {
        ...state,
        allVideos: [...videos],
        playlists: [
          {
            title: "Favourites",
            videos: [],
          },
        ],
      };
    }
    case "watchLaterChanger": {
      const updatedData = state?.allVideos?.map((video) =>
        video._id === payload[1]
          ? { ...video, watchLater: !payload[0] }
          : { ...video }
      );

      return { ...state, allVideos: [...updatedData] };
    }

    case "playlistAdder": {
      //   console.log(payload);
      return {
        ...state,
        playlists: [...state.playlists, { title: payload, videos: [] }],
      };
    }

    case "playlistRemover": {
      //   console.log(payload);
      const updatedData = state?.playlists?.filter(
        ({ title }) => title !== payload
      );
      return {
        ...state,
        playlists: [...updatedData],
      };
    }

    case "playlistVideoAdder": {
      let updatedData;
      const foundPlaylist = state?.playlists?.find(
        ({ title }) => title === payload[0]
      );
      if (foundPlaylist.videos.find((vid) => vid._id === payload[1]._id)) {
        updatedData = state?.playlists?.map((playlist) =>
          playlist.title === foundPlaylist.title
            ? {
                ...playlist,
                videos: playlist.videos.filter(
                  ({ _id }) => _id !== payload[1]._id
                ),
              }
            : { ...playlist }
        );
      } else {
        updatedData = state?.playlists?.map((playlist) =>
          playlist.title === foundPlaylist.title
            ? {
                ...playlist,
                videos: [...playlist.videos, { ...payload[1] }],
              }
            : { ...playlist }
        );
      }

      return { ...state, playlists: [...updatedData] };
    }

    case "noteAdd": {
      const updatedData = state?.allVideos?.map((vid) =>
        vid._id === payload[1]
          ? { ...vid, notes: [...vid.notes, payload[0]] }
          : { ...vid }
      );
      return { ...state, allVideos: [...updatedData] };
    }

    case "noteDelete": {
      const updatedData = state?.allVideos?.map((vid) =>
        vid._id === payload[1]
          ? { ...vid, notes: vid.notes.filter((note) => note !== payload[0]) }
          : { ...vid }
      );
      return { ...state, allVideos: [...updatedData] };
    }

    case "noteUpdate": {
      const updatedData = state?.allVideos?.map((vid) =>
        vid._id === payload[2]
          ? {
              ...vid,
              notes: [...vid.notes, payload[1]].filter(
                (note) => note !== payload[0]
              ),
            }
          : { ...vid }
      );
      return { ...state, allVideos: [...updatedData] };
    }

    default: {
      return { ...state };
    }
  }
};
