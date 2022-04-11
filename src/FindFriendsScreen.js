import { ContactSupportOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";

import "./FindFriends.css";
import { User } from "./models";
import AddIcon from "@mui/icons-material/Add";
import { IconButton } from "@mui/material";
import { DataStore } from "@aws-amplify/datastore";
import { Friendship } from "./models";

function FindFriendsScreen(props) {
  const user = props.user;
  const [results, setResults] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    //console.log("user", user.id);
  }, [user]);

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
    //console.log(friendRequest);
    await DataStore.save(
      Friendship.copyOf(friendRequest, (updated) => {
        updated.requestAccepted = true;
      })
    );
    alert("Friend Request Accepted");
  };

  const getfriendRequests = async () => {
    //console.log("lookin 4", user.id);
    const friendRequests = await DataStore.query(Friendship).then((friendRequests) => {
      //console.log("friend requests?!?!?!?!?!?!?", friendRequests.map((f) => console.log(f.friendshipReceiverId, user.id)));
      return setFriendRequests(friendRequests.filter((f) => f.friendshipReceiverId === user.id && f.requestAccepted == false));
    });
  };

  useEffect(() => {
    //console.log("searchString changed", searchString);
  }, [searchString]);

  async function search() {
    //console.log("searching for ", searchString)

    var results = await DataStore.query(User, (u) =>
      u.username("contains", searchString)
    );

    //remove self
    results = results.filter((r) => r.username != user.username);

    //console.log(results);

    setResults(results);
  }

  async function addFriend(possibleFriend) {
    //DataStore.clear()
    //console.log("adding friend", possibleFriend);
    await DataStore.save(
      new Friendship({
        requestAccepted: false,
        Receiver: possibleFriend,
        Sender: user,
      })
    );
  }

  useEffect(() => {
    //console.log("friend requests changed", friendRequests);
  }, [friendRequests]);

  return (
    <div className="find_friends_root">
      <h1 className="header">Find Friends</h1>
      {friendRequests.length > 0 ? (
        <div clasName = 'friend_request_container'>
        <div className = 'friend_request'>
          {friendRequests.map((r) => 
            <div>
              <p>{r.Sender.username}</p>
            <button onClick={(f) => acceptFriendRequest(r)}>Accept</button>
            </div>

          )
          }
        </div>
        </div>



      ) : (
        <></>
      )}
      <div className="search_form_container">
        <input
          onChange={(t) => {
            setSearchString(t.target.value);
          }}
        ></input>
        <button onClick={search}>Search</button>
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
              <AddIcon sx={{ fontSize: 30 }}></AddIcon>
            </IconButton>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindFriendsScreen;
