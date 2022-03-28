import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import "./Header.css";
import IconButton from "@mui/material/IconButton";

const Header = () => {
  return (
    <div className="header">
      <IconButton>
        <PersonOutlineIcon
          className="header_icon"
          fontSize="large"
        ></PersonOutlineIcon>
      </IconButton>
      <IconButton>
        <TheaterComedyIcon
          className="header_icon"
          fontSize="large"
        ></TheaterComedyIcon>
      </IconButton>
      <IconButton>
        <SlideshowIcon className="header_icon" fontSize="large"></SlideshowIcon>
      </IconButton>
    </div>
  );
};

export default Header;
