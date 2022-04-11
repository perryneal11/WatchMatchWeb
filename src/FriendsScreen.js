import React, {useState, useEffect} from "react";
import "./FriendsScreen.css";
import { Link } from "react-router-dom";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { DataStore } from '@aws-amplify/datastore';
import { Friendship } from './models';


function FriendsScreen(props) {
  const user = props.user;
  const [friends, setFriends ] = useState([])


useEffect(() => {
  //console.log('friends changed', friends)
}, [friends]);

  useEffect(() => {
    async function getFriends(){
      //console.log('getting friends')
      const usersFriendships = await DataStore.query(Friendship, f =>
        f
          .or(f =>
            f
              .friendshipSenderId('eq', user.id)
              .friendshipReceiverId('eq', user.id),
          )
          .requestAccepted('eq', true),
      );
      const receivers = usersFriendships.map(f => f.Receiver);
      const senders = usersFriendships.map(f => f.Sender);
      const friends = receivers.concat(senders).filter(u => u.id != user.id);
      const friendsNoDuplicates = [...new Set(friends)];
      //setIsLoading(false);
      return setFriends(friendsNoDuplicates);
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
          <Link to ="/" state = {{friend: f}} >
            <PlayCircleIcon sx={{fontSize: 100}} className='play_icon'></PlayCircleIcon>
          </Link>
          </div>

      ))}
      </div>
    </div>
  );
}

export default FriendsScreen;
