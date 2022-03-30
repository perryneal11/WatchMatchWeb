import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import "./Header.css";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div className="header">
           <Link to="/profile">
      <IconButton>

        <PersonOutlineIcon
          className="header_icon"
          fontSize="large">
          
        </PersonOutlineIcon>
      </IconButton>
      </Link>
      <IconButton>
      <Link to="/">
        <TheaterComedyIcon
          className="header_icon"
          fontSize="large"
        ></TheaterComedyIcon>
        </Link>
      </IconButton>
      <Link to="/friends">
      <IconButton>
        <SlideshowIcon className="header_icon" fontSize="large"></SlideshowIcon>
      </IconButton>
      </Link>
    </div>
  );
};

export default Header;
