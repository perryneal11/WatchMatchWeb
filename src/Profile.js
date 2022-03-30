
import { useState , useEffect} from "react";

function ProfileScreen(props) {
    const user = props.user

    useEffect(() => {
        console.log()
    }, [user]);

    return (<h1>hello {user.username} from profile screen</h1>);
}

export default ProfileScreen;