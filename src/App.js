import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NavSection from "./components/NavSection";
import "../src/styles/App.css";
import Explore from "./pages/Explore";
import Playlist from "./pages/Playlist";
import WatchLater from "./pages/WatchLater";
import VideosPage from "./pages/VideosPage";
import DetailsPage from "./pages/DetailsPage";
import PlaylistVideos from "./pages/PlaylistVideos";

function App() {
  return (
    <div className="App">
      <NavSection />
      <section className="mainContent">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/playlists" element={<Playlist />} />
          <Route path="/watchLater" element={<WatchLater />} />
          <Route path="/videos/:category" element={<VideosPage />} />
          <Route path="/details/:videoId" element={<DetailsPage />} />
          <Route path="/playlistVids/:name" element={<PlaylistVideos />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
