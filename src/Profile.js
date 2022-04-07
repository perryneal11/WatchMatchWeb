
import { useState , useEffect} from "react";

function ProfileScreen(props) {
    const user = props.user

    useEffect(() => {
        console.log()
    }, [user]);

    return (
        <div className="profile_root">
        <img src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} className="profile_pic"></img>

            <input value = 'username'></input>
            Netflix:
            <input type = "checkbox"></input>
            Prime:
            <input type = "checkbox"></input>
            <button>save</button>


        </div>


    );
}

export default ProfileScreen;