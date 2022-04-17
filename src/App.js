import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { Auth } from "aws-amplify";
import { DataStore } from "@aws-amplify/datastore";
import { User } from "./models";
import "@aws-amplify/ui-react/styles.css";
import Header from "./Header";
import { Routes, Route, useLocation } from "react-router-dom";
import MovieCards from "./movieCards";
import ProfileScreen from "./Profile.js";
import FindFriendsScreen from "./FindFriendsScreen.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FriendsScreen from "./FriendsScreen";
import WatchMatchScreen from "./WatchMatchScreen";

//might needs
//Amplify.Logger.LOG_LEVEL = 'DEBUG'
//DataStore.clear()

function App(props) {
  const [movieData, setMovieData] = React.useState([]);
  const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const state = location.state;
  const [friend, setFriend] = useState(state?.friend);

  useEffect(() => {
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
              netflix: true,
              prime: true,
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
    fetch("https://watchmatchmovies.herokuapp.com/getMovies", {
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
      <MovieCards movies={moviesDataForCards} user={user} doNothingFlag ={false}/>
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
    sendMovieDataToCards(filteredData);
  }, [filteredData]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setFriend(state?.friend);
    filterMovieData(movieData);
    sendMovieDataToCards(filteredData);
  }, [movieData]);

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
                path="/friends/watchMatch"
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
