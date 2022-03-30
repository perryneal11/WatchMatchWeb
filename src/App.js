import "./App.css";
import React, { useEffect, useState, useCallback } from "react";
import { Auth, DataStore } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import Header from "./Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MovieCards from "./movieCards";

function App(props) {
  const [movieData, setMovieData] = React.useState([]);
  const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
  const [filteredData, setFilteredData] = React.useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = props.user;
  /*
  const signOut = () => {
    Auth.signOut()
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };
  */

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

  return (
    <div className="App">
      <Header />
      <Router>
        <Routes>
          <Route path="/profile" element={<h>hello from profile screen</h>} />
          <Route
            path="/"
            element={<MovieCards 
              movies={moviesDataForCards}
              user ={user}
            ></MovieCards>}
          />
          <Route path="/friends" element={<h>hello from friends screen</h>} />
        </Routes>
      </Router>

      {/* cards */}
      {/* buttons */}

      {/* friends screen */}
      {/* watchmatch screen */}
    </div>
  );
}

export default App;
