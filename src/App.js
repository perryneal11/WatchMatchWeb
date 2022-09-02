import "./App.css";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Routes, Route, useLocation } from "react-router-dom";
import MovieCards from "./movieCards";
import ProfileScreen from "./Profile.js";
import FindFriendsScreen from "./FindFriendsScreen.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import FriendsScreen from "./FriendsScreen";
import WatchMatchScreen from "./WatchMatchScreen";
import movies from "./movies.js"

function App(props) {

  const [movieData, setMovieData] = React.useState([]);
  const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const state = location.state;
  const [friend, setFriend] = useState(state?.friend);


  const sendMovieDataToCards = () => {
    setMovieDataForCards(movies.results);
  };

  const filterMovieData = () => {
    sendMovieDataToCards(movies)
  };

  useEffect(() => {
    sendMovieDataToCards()
  }, []);

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


  return (
    <div className="App">
      <>
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
         
         
         

        <div className="bottom_row">
          <Header />
        </div>
      </>
    </div>
  );
}

/* (
  <Box sx={{ display: "flex" }}>
    <CircularProgress />
  </Box>
)}

*/

export default App;
