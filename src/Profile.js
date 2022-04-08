import { useState , useEffect} from "react";
import './Profile.css'
import {User} from './models';
import {Auth, DataStore} from 'aws-amplify';



function ProfileScreen(props) {
    const user = props.user
    const [username, setUsername] = useState(user.username)
    const [netflix, setNetflix] = useState(user.Netflix)
    const [prime, setPrime] = useState(user.Prime)

    useEffect(() => {
        console.log('net in profile screen ', netflix)
    }, [user]);

    async function save() {
        DataStore.clear();
        if (user) {
          const updateUser = User.copyOf(user, updated => {
            (updated.Prime = prime); (updated.Netflix = netflix); (updated.username = username);
          });
          await DataStore.save(updateUser);
          alert('User updated');
        } else {
          //create new user
          const authUser = await Auth.currentAuthenticatedUser();
          const newUser = new User({
            Netflix: netflix,
            Prime: prime,
            awsID: authUser.attributes.sub,
            username: authUser.attributes.email,
          });
          await DataStore.save(newUser);
          alert('New user created');
        }
        console.log('hit')
      };


    return (
        <div className="profile_root">
        <img  src={"https://villagesonmacarthur.com/wp-content/uploads/2020/12/Blank-Avatar.png"} className="profile_pic"></img>

            <input className="username" defaultValue={username}></input>
            
            <div className="checkbox_container">
            <label>Netflix:<input type = "checkbox" checked = {netflix} onChange={e=>{setNetflix(e.target.checked)}}></input></label>
            <label>Prime:<input type = "checkbox" checked = {prime} onChange={e=>{setPrime(e.target.checked)}}></input></label>
            </div>
            <button className="button" onClick={save}>save</button>
            <button onClick={props.signOut} className="button">
        SignOut
      </button>


        </div>


    );
}

export default ProfileScreen;