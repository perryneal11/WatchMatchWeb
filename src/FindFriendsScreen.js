import { ContactSupportOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

import "./FindFriends.css";
import { User } from "./models";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { DataStore } from "@aws-amplify/datastore";
import { Friendship } from "./models";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


function FindFriendsScreen(props) {
  const user = props.user;
  const [results, setResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getfriendRequests();
    } else {
      console.log("mounting issue");
    }
    return () => (mounted = false);
  }, []);

  const acceptFriendRequest = async (friendRequest) => {
    await DataStore.save(
      Friendship.copyOf(friendRequest, (updated) => {
        updated.requestAccepted = true;
      })
    );
    alert("Friend Request Accepted");
  };

  const getfriendRequests = async () => {
    const friendRequests = await DataStore.query(Friendship).then((friendRequests) => {
      return setFriendRequests(friendRequests.filter((f) => f.friendshipReceiverId === user.id && f.requestAccepted == false));
    });
  };


  async function search() {
    var results = await DataStore.query(User, (u) =>
      u.username("contains", searchString)
    );
    results = results.filter((r) => r.username != user.username);
    setResults(results);
  }

  async function addFriend(possibleFriend) {
    alert("Friend request sent")
    await DataStore.save(
      new Friendship({
        requestAccepted: false,
        receiver: possibleFriend,
        sender: user,
      })
    );
  }

  return (
    <div className="find_friends_root">

      <h1 className="header">Find Friends</h1>
      {friendRequests.length > 0 ? (
        <div clasName = 'friend_request_container'>
        <div className = 'friend_request'>
          {friendRequests.map((r) => 
            <div>
              <p>{r.Sender.username}</p>
            <Button onClick={(f) => acceptFriendRequest(r)}>Accept</Button>
            </div>

          )
          }
        </div>
        </div>



      ) : (
        <></>
      )}
      <div className="search_form_container">

<TextField id="outlined-basic" label="Outlined" variant="outlined"           onChange={(t) => {
            setSearchString(t.target.value);
          }}/>

        <Button variant = "contained" onClick={search}>Search</Button>
      </div>
      <div className="results_container">
        {results.map((f) => (
          <div key={f.id} className="result">
            <img
              src={
                "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
              }
              className="profile_pic"
            ></img>

            <p key={f.username}>{f.username}</p>
            <IconButton onClick={() => addFriend(f)}>
              <AddIcon sx={{ fontSize: 70 }}></AddIcon>
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindFriendsScreen;
