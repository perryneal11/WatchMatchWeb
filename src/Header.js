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
          sx={{fontSize: 100} }
        ></TheaterComedyIcon>
      </Link>

      <Link to="/friends">
        <IconButton>
          <SlideshowIcon
            sx={{fontSize: 100}}
          ></SlideshowIcon>
        </IconButton>
      </Link>


      <Link to="/findFriends">
        <IconButton>
          <GroupAddIcon
            sx={{fontSize: 100}}
          ></GroupAddIcon>
        </IconButton>
      </Link>




      <Link to="/profile">
        <IconButton>
          <SettingsIcon
            sx={{fontSize: 100}}
          ></SettingsIcon>
        </IconButton>
      </Link>

    </div>
  );
};

export default Header;
