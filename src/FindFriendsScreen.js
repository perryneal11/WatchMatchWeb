
import { useState , useEffect} from "react";

function FindFriendsScreen(props) {
    const user = props.user

    useEffect(() => {
        console.log()
    }, [user]);

    return (<h1>hello {user.username} from find friends screen</h1>);
}

export default FindFriendsScreen;