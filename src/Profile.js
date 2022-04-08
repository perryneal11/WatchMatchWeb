import { useState , useEffect} from "react";
import './Profile.css'

function ProfileScreen(props) {
    const user = props.user

    useEffect(() => {
        console.log()
    }, [user]);

    return (
        <div className="profile_root">
        <img  src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} className="profile_pic"></img>

            <input className="username" value = 'username'></input>
            
            <div className="checkbox_container">
            <label>Netflix:<input type = "checkbox"></input></label>
            <label>Prime:<input type = "checkbox"></input></label>
            </div>
            <button className="button">save</button>
            <button onClick={props.signOut} className="button">
        SignOut
      </button>


        </div>


    );
}

export default ProfileScreen;