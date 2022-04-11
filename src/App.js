import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from '@aws-amplify/datastore';
import { User } from './models';
import "@aws-amplify/ui-react/styles.css";
import {Amplify} from "aws-amplify";
import Header from "./Header";
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import MovieCards from "./movieCards";
import ProfileScreen from "./Profile.js";
import FindFriendsScreen from "./FindFriendsScreen.js";
import config from "./aws-exports.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FriendsScreen from "./FriendsScreen";
import WatchMatchScreen from "./WatchMatchScreen";

function App(props) {
  const [movieData, setMovieData] = React.useState([]);
  const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState(null);
  const location = useLocation();
  const state = location.state;

  const [friend, setFriend] = useState(state?.friend)

  useEffect(() => {
    //Amplify.Logger.LOG_LEVEL = 'DEBUG'
    //DataStore.clear()

    const getCurrentUser = async () => {
      const who = await Auth.currentAuthenticatedUser().then(async function (
        who
      ) {
        const dbUsers = await DataStore.query(User, (u) =>
          u.awsID("eq", who.attributes.sub)
        ).then(async function (dbUsers) {
          if (dbUsers.length == 0) {
            const authUser = await Auth.currentAuthenticatedUser();
            const newUser = new User({
              Netflix: true,
              Prime: true,
              awsID: authUser.attributes.sub,
              username: authUser.attributes.email,
            });
            await DataStore.save(newUser)
              .then(function () {
                alert("New user created");
                return setUser(newUser);
              })
              .catch((err) => {
                console.log(err);
              });
          } else {
            const dbUser = dbUsers[0];
            return setUser(dbUser);
          }
        });
      });
    };
    getCurrentUser();
  }, []);
  
  const fetchData = async () => {
    fetch("https://radiant-reaches-78484.herokuapp.com/getMovies", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setMovieData(data);
        setIsLoading(false);
      })
      .catch((err) => {});
  };

  const sendMovieDataToCards = () => {
    setMovieDataForCards(movieData);
  };


  function filterMovieDataByFriend() {
    console.log('hit')
    const combinedShows = [];
    const usersShows = [];
    const friendsShows = [];
    if (friend.approvedContentIMDBID != null && user.approvedContentIMDBID != null) {
      friend.friend.approvedContentIMDBID.forEach(o => {
        //console.log("friend", o)
        friendsShows.push(JSON.parse(o));
        combinedShows.push(JSON.parse(o));
      });
  
      user.approvedContentIMDBID.forEach(o => {
        //console.log("user", o)
        usersShows.push(JSON.parse(o));
        combinedShows.push(JSON.parse(o));
      });
          //console.log("combined shows", combinedShows)

    const usersShowsImdbids = usersShows.map(s => s.imdbID);
    const friendsShowsImdbids = friendsShows.map(s => s.imdbID);
    const combinedShowsImdbids = combinedShows.map(s => s.imdbID);
    //console.log("combinedShowsImdbids",combinedShowsImdbids)
    //console.log("usersShowsImdbids",usersShowsImdbids)
    //console.log("friendsShowsImdbids",friendsShowsImdbids)

    const combined = combinedShows.filter(
      s =>
        friendsShowsImdbids.includes(s.imdbID) &&
        usersShowsImdbids.includes(s.imdbID),
    );

    //console.log("combined", combined, typeof combined)

    if (
      friendsShows != null ||
      (friendsShows.length != 0 && usersShows != null) ||
      usersShows.length != 0
    ) {
      const showsNoDuplicates = Array.from(new Set(combined.flat()));
      //console.log('showsNoDuplicates', showsNoDuplicates, typeof showsNoDuplicates);

      //showsNoDuplicates.forEach(item=>{
      //  console.log(item, item != null)
      //  console.log(item, item.length != 0)
      //})

      var showsNoDuplicatesNoEmpties = showsNoDuplicates.filter(
        el => el != null && el.length != 0,
      );
      //console.log('showsNoDuplicatesNoEmpties', showsNoDuplicatesNoEmpties, typeof showsNoDuplicatesNoEmpties);
      return setFilteredData(showsNoDuplicates);
    } else return;
  }
  }



  const filterMovieData = () => {
    if (user) {
      const likedMovies = [];
      if (user.approvedContentIMDBID) {
        user.approvedContentIMDBID.forEach((o) => {
          likedMovies.push(JSON.parse(o));
        });
      }

      const likedMoviesimdbids = likedMovies.map((m) => m.imdbID);

      const dislikedMovies = [];

      if (user.unapprovedContentIMDBID) {
        user.unapprovedContentIMDBID.forEach((o) => {
          dislikedMovies.push(JSON.parse(o));
        });
      }

      const dislikedMoviesimdbids = dislikedMovies.map((m) => m.imdbID);

      if (likedMovies != null && dislikedMovies != null) {
        return setFilteredData(
          movieData.filter(
            (item) =>
              !likedMoviesimdbids.includes(item.imdbID) &&
              !dislikedMoviesimdbids.includes(item.imdbID)
          )
        );
      } else {
        return setFilteredData(movieData);
      }
    }
  };

  function renderCards() {
    return moviesDataForCards.length > 0 ? (
      <MovieCards movies={moviesDataForCards} user={user} />
    ) : (
      <Box
        sx={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  useEffect(() => {
    filterMovieData(movieData);
    sendMovieDataToCards(filteredData);
  }, [movieData]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();

    if(friend){
      filterMovieDataByFriend()
    }
    else{
      filterMovieData(filteredData);
    }

    sendMovieDataToCards();
  }, []);

  useEffect(() => {
    //console.log("movies", moviesDataForCards);
  }, [moviesDataForCards]);

  useEffect(() => {
    DataStore.start().catch(() => {
      DataStore.clear().then(() => {
        DataStore.start();
      });
    });
  }, []);

  return (
    <div className="App">
      <>
        {user ? (
          <div className="root">
            <Routes>
            <Route path="/" element={renderCards()} />
              <Route
                path="/profile"
                element={<ProfileScreen user={user} signOut={props.signOut} />}
              />
              <Route
                path="/findFriends"
                element={<FindFriendsScreen user={user} />}
              />

              <Route
                path="/friends"
                element={<FriendsScreen user={user}> </FriendsScreen>}
              />
              <Route
                path="/watchMatch"
                element={<WatchMatchScreen user={user}></WatchMatchScreen>}
              />
            </Routes>
          </div>
        ) : (
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        )}
        <div className="bottom_row">
          <Header />
        </div>
      </>
    </div>
  );
}

export default App;
