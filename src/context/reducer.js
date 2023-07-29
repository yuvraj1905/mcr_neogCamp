export const reducer = (state, { type, payload }) => {
  switch (type) {
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

    default: {
      return { ...state };
    }
  }
};
