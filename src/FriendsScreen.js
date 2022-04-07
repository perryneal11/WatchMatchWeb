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
      username: "steve",
      photo:
        "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png",
    },
  ];

  return (
    <div>
      <h>friends</h>
      {friends.map((f) => (
        <div className = 'friends_container'>
          <img src={f.photo} className="profile_pic"></img>

          <p>{f.username}</p>
          <Link to="/watchMatch">
            <PlayCircleIcon></PlayCircleIcon>
          </Link>
          </div>

      ))}
    </div>
  );
}

export default FriendsScreen;
