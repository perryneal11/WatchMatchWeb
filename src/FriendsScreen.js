import React from "react";
import "./FriendsScreen.css";
import { Link } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';

function FriendsScreen(props) {
  const user = props.user;
  const friends = [
    {
      username: "steve",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },

    {
      username: "encheff",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
    {
      username: "phil",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
    {
      username: "sean",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
    {
      username: "cinthia",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
    {
      username: "mom",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },

    {
      username: "mom",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
    {
      username: "mom",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
    {
      username: "mom",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
  ];

  return (
    <div className="friends_root">
    <h className='header'>Your Friends</h>
      <div className="friends_list_container">
      {friends.map((f) => (
        <div className = 'friends_container'>
          <img src={f.photo} className="profile_pic"></img>
          <p>{f.username}</p>
          <Link to="/watchMatch">
            <PlayCircleIcon sx={{fontSize: 100}} className='play_icon'></PlayCircleIcon>
          </Link>
          </div>

      ))}
      </div>
    </div>
  );
}

export default FriendsScreen;
