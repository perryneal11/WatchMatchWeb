import { useState, useEffect } from "react";
import "./FindFriends.css";
import AddIcon from "@mui/icons-material/Add";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

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
    alert("Friend Request Accepted");
  };

  const getfriendRequests = async () => {

  };


  async function search() {

  }

  async function addFriend(possibleFriend) {
    alert("Friend request sent")

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
