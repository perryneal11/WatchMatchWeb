import { useState, useEffect } from "react";
import "./Profile.css";
import { DataStore } from "@aws-amplify/datastore";
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';


function ProfileScreen(props) {
  const user = props.user;
  const [username, setUsername] = useState("");
  const [netflix, setNetflix] = useState("");
  const [prime, setPrime] = useState("");
  

  async function save() {

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
