import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { Auth, DataStore } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Amplify from 'aws-amplify'
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCards from "./movieCards";
import ProfileScreen from "./Profile.js";
import FindFriendsScreen from "./FindFriendsScreen.js";
import { User } from "./models";
import config from './aws-exports.js'
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FriendsScreen from "./FriendsScreen";

function App(props) {
  const [movieData, setMovieData] = React.useState([]);
  const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      await DataStore.clear();
      const who = await Auth.currentAuthenticatedUser();
      const dbUsers = await DataStore.query(User, (u) =>
        u.awsID("eq", who.attributes.sub)
      );

      console.log('DATABASE USERS', dbUsers)

      if (dbUsers.length < 1) {
        const authUser = await Auth.currentAuthenticatedUser();
        const newUser = new User({
          Netflix: true,
          Prime: true,
          awsID: authUser.attributes.sub,
          username: authUser.attributes.email,
        });
        await DataStore.save(newUser)
          .then(function () {
            console.log("New user created");
            return setUser(newUser);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const dbUser = dbUsers[0];
        
        return setUser(dbUser);
      }
    };
    getCurrentUser();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

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

  useEffect(() => {}, []);

  useEffect(() => {
    filterMovieData(movieData);
    sendMovieDataToCards(filteredData);
  }, [movieData]);

  useEffect(() => {
    setIsLoading(true);
    fetchData();
    filterMovieData(filteredData);
    sendMovieDataToCards();
  }, []);

  useEffect(() => {
    console.log("movies", moviesDataForCards);
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
      <Router>
        {user ? (
          <div className="root">
            <Routes>
              <Route path="/profile" element={<ProfileScreen user={user} signOut = {props.signOut}/>} />
              <Route
                path="/findFriends"
                element={<FindFriendsScreen user={user} />}
              />
              <Route path="/" element={renderCards()} />
              <Route
                path="/friends"
                element={<FriendsScreen user={user}> </FriendsScreen>}
              />
              <Route path="/watchMatch" element={renderCards()} />
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
      </Router>
    </div>
  );
}

export default App;
