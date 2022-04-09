import { useState, useEffect } from "react";
import "./Profile.css";
import { User } from "./models";
import { Auth, DataStore } from "aws-amplify";

function ProfileScreen(props) {
  const user = props.user;
  const [username, setUsername] = useState(user.username);
  const [netflix, setNetflix] = useState(user.Netflix);
  const [prime, setPrime] = useState(user.Prime);

  async function save() {

  const dbUser = await DataStore.query(User, (u) =>
    u.awsID("eq", user.awsID)
  );
  console.log(dbUser)
    const updateUser = User.copyOf(dbUser[0], (updated) => {
      updated.Prime = netflix;
      updated.Netflix = prime;
      
    });

    await DataStore.save(updateUser).then(function () {
        console.log('updated user', updateUser)
        alert("User updated");
      })
      .catch((err) => {
        console.log(err);
      });
    
  }

  return (
    <div className="profile_root">
      <img
        src={
          "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
        }
        className="profile_pic"
      ></img>

      <input className="username" defaultValue={username}></input>

      <div className="checkbox_container">
        <label>
          Netflix:
          <input
            type="checkbox"
            checked={netflix}
            onChange={(e) => {
              setNetflix(e.target.checked);
            }}
          ></input>
        </label>
        <label>
          Prime:
          <input
            type="checkbox"
            checked={prime}
            onChange={(e) => {
              setPrime(e.target.checked);
            }}
          ></input>
        </label>
      </div>
      <button className="button" onClick={save}>
        save
      </button>
      <button onClick={props.signOut} className="button">
        SignOut
      </button>
    </div>
  );
}

export default ProfileScreen;
