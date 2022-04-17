import { useState, useEffect } from "react";
import "./Profile.css";
import { User } from "./models";
import { DataStore } from "@aws-amplify/datastore";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';


function ProfileScreen(props) {
  const user = props.user;
  const [username, setUsername] = useState(user.username);
  const [netflix, setNetflix] = useState(user.netflix);
  const [prime, setPrime] = useState(user.prime);
  

  async function save() {
    const dbUser = await DataStore.query(User, (u) =>
      u.awsID("eq", user.awsID)
    );

    console.log(dbUser);
    const updateUser = User.copyOf(dbUser[0], (updated) => {
      updated.prime = netflix;
      updated.netflix = prime;
      updated.username = username;
    });

    await DataStore.save(updateUser)
      .then(function () {
        console.log("updated user", updateUser);
        alert("User updated");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    //DataStore.clear()

  }, []);

  return (
    <div className="profile_root">
      <img
        src={
          "https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"
        }
        className="profile_pic"
      ></img>

      <input
        className="username"
        defaultValue={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      ></input>

      <div className="checkbox_container">

        <FormControlLabel control={<Switch checked={netflix}
            onChange={(e) => {
              setNetflix(e.target.checked);
            }}/>} label="Netlfix" />


<FormControlLabel control={<Switch checked={prime}
            onChange={(e) => {
              setPrime(e.target.checked);
            }}/>} label="Prime:" />


      </div>
      <Button variant="contained" className="button" onClick={save}>
        save
      </Button>
      <Button variant="contained" onClick={props.signOut} className="button">
        SignOut
      </Button>
    </div>
  );
}

export default ProfileScreen;
