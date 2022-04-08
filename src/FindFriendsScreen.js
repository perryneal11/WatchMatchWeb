
import { useState , useEffect} from "react";

function FindFriendsScreen(props) {
    const user = props.user
    const results = [
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

    useEffect(() => {
        console.log()
    }, [user]);

    return (
        <div className = "find_friends_root">
            <h1 className="header">Find Friends</h1>
            <div className="search_form_container">
                <input></input>
                <button>Search</button>
            </div>
            <div clasName = 'results_container'>
            {results.map((f) => (
        <div className = 'friends_container'>
          <img src={f.photo} className="profile_pic"></img>

          <p>{f.username}</p>

          </div>

      ))}
            </div>

        </div>
    );
}

export default FindFriendsScreen;