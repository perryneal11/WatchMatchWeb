import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { Auth, DataStore } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCards from "./movieCards";
import { Link } from "react-router-dom";
import ProfileScreen from "./Profile.js";
import FindFriendsScreen from "./FindFriendsScreen.js";

import { User } from "./models";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function App(props) {
  const [movieData, setMovieData] = React.useState([]);
  const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCurrentUser = async () => {
      const who = await Auth.currentAuthenticatedUser();

      const dbUsers = await DataStore.query(User, (u) =>
        u.awsID("eq", who.attributes.sub)
      );

      if (dbUsers.length < 1) {
        const authUser = await Auth.currentAuthenticatedUser();
        const newUser = new User({
          Netflix: false,
          Prime: false,
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
        console.log("hit");
        const dbUser = dbUsers[0];
        setUser(dbUser);
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

  return (
    <div className="App">
      <Router>
        {user ? (
          <>
            <Routes>
              <Route
                path="/profile"
                element={
                  <div className="card_container">
                <ProfileScreen user={user}></ProfileScreen>
                </div>}
              />

              <Route
                path="/findFriends"
                element={
                  <div className="card_container">
                <FindFriendsScreen user={user}></FindFriendsScreen>
                </div>}
              />



              <Route
                path="/"
                element={
                  moviesDataForCards.length > 0 ? (
                    <div className="card_container">
                      <MovieCards
                        className="cards"
                        movies={moviesDataForCards}
                        user={user}
                      ></MovieCards>
                    </div>
                  ) : (
                    <>
                    <div className="card_container">
                      <Box
                        sx={{
                          display: "flex",
                          height: '100%',
                          width: '100%',
                          justifyContent: "center",
                          alignItems: 'center',
                        }}
                      >
                        <CircularProgress />
                      </Box>
                      </div>
                    </>
                  )
                }
              />
              <Route
                path="/friends"
                element=
                
                {
                
                  <div className="card_container">
                <h>hello from friends screen</h>
                </div>}
              />
            </Routes>
            <div className="bottom_row">
              <Header />
            </div>
          </>
        ) : (
          <>
            {" "}
            <Box sx={{ display: "flex" }}>
              <CircularProgress />
            </Box>
          </>
        )}
      </Router>
      <button onClick={props.signOut} className="signOutButton">
        SignOut
      </button>
    </div>
  );
}

export default App;
