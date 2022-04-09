import { ContactSupportOutlined } from "@mui/icons-material";
import { useState , useEffect} from "react";

import './FindFriends.css'
import { User } from "./models";
import AddIcon from '@mui/icons-material/Add';
import { IconButton } from "@mui/material";
import { DataStore } from '@aws-amplify/datastore';
import { Friendship } from './models';

function FindFriendsScreen(props) {
    const user = props.user
    const [results, setResults] = useState([])
    const [searchString, setSearchString] = useState("")


    useEffect(() => {
        console.log()
    }, [user]);

    useEffect(() => {
      console.log('searchString changed' , searchString)
    }, [searchString]);


    async function search() {
      console.log("searching for ", searchString)

      var results = await DataStore.query(User, (u) =>
          u.username("contains", searchString)
        )

        //remove self 
        results = results.filter((r) => r.username != user.username)

        console.log(results)

        setResults(results)

    }

    async function addFriend(possibleFriend) {
      console.log('adding friend', possibleFriend)
      await DataStore.save(
        new Friendship({
        "requestAccepted": false,
        "Receiver": possibleFriend,
        "Sender": user
      })
    );


    }

    return (
        <div className = "find_friends_root">
            <h1 className="header">Find Friends</h1>
            <div className="search_form_container">
                <input onChange={(t)=>{setSearchString(t.target.value)}} ></input>
                <button onClick={search}>Search</button>
            </div>
            <div className = 'results_container'>
            {results.map((f) => (
        <div key = {f.id}className = 'result'>
          <img src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} className="profile_pic"></img>

          <p key = {f.username}>{f.username}</p>
          <IconButton onClick={()=> addFriend(f)}><AddIcon sx={{fontSize:30}}></AddIcon></IconButton>


          </div>

      ))}
            </div>

        </div>
    );
}

export default FindFriendsScreen;