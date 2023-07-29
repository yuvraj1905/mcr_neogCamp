import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/NavSections.css";

const NavSection = () => {
  const navLinksStyler = ({ isActive }) => ({
    color: isActive && "#509ECF",
  });
  return (
    <div className="navSection">
      <NavLink style={navLinksStyler} to="/">
        Home
      </NavLink>
      <NavLink style={navLinksStyler} to="/explore">
        Explore
      </NavLink>
      <NavLink style={navLinksStyler} to="/playlists">
        Playlists
      </NavLink>
      <NavLink style={navLinksStyler} to="/watchLater">
        Watch Later
      </NavLink>
    </div>
  );
};

export default NavSection;
