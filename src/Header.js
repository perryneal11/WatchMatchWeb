import React from "react";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SlideshowIcon from "@mui/icons-material/Slideshow";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import "./Header.css";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';

const Header = () => {
  return (
    <div className="header">
      <Link to="/">
        <TheaterComedyIcon
          className="header_icon"
          fontSize="large"
        ></TheaterComedyIcon>
      </Link>

      <Link to="/friends">
        <IconButton>
          <SlideshowIcon
            className="header_icon"
            fontSize="large"
          ></SlideshowIcon>
        </IconButton>
      </Link>


      <Link to="/findFriends">
        <IconButton>
          <GroupAddIcon
            className="header_icon"
            fontSize="large"
          ></GroupAddIcon>
        </IconButton>
      </Link>




      <Link to="/profile">
        <IconButton>
          <SettingsIcon
            className="header_icon"
            fontSize="large"
          ></SettingsIcon>
        </IconButton>
      </Link>

    </div>
  );
};

export default Header;
