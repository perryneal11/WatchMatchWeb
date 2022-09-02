import React, {useState, useEffect} from "react";
import "./FriendsScreen.css";
import { Link } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { DataStore } from '@aws-amplify/datastore';

function FriendsScreen(props) {
  const user = props.user;
  const [friends, setFriends ] = useState([])

  useEffect(() => {
    async function getFriends(){
    };
    getFriends()
  }, []);

  return (
    <div className="friends_root">
    <h1 className='header'>Your Friends</h1>
      <div className="friends_list_container">
      {friends.map((f) => (
        <div key = {f.awsID} className = 'friends_container'>
          <img key = {f.id} src={f.photo} className="profile_pic"></img>
          <p key={f.username}>{f.username}</p>
          <Link to ="watchMatch" state = {{friend: f}} >
            <PlayCircleIcon sx={{fontSize: 100}} className='play_icon'></PlayCircleIcon>
          </Link>
          </div>
      ))}
      </div>
    </div>
  );
}

export default FriendsScreen;
