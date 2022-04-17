import React, { useEffect, useState, useCallback } from "react";
import MovieCards from "./movieCards";
import {
  BrowserRouter as BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";



function WatchMatchScreen(props) {
    const user = props.user
    const [movieData, setMovieData] = React.useState([]);
    const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const location = useLocation();

    const state = location.state;
    const [friend, setFriend] = useState(state?.friend)

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
      console.log('sending data to cards', filteredData)
      setMovieDataForCards(filteredData);
    };


  function filterMovieDataByFriend() {
    //console.log('user', user)
    //console.log('friend', friend)
    const combinedShows = [];
    const usersShows = [];
    const friendsShows = [];
    if (friend.approvedContentIMDBID != null && user.approvedContentIMDBID != null) {
      friend.approvedContentIMDBID.forEach(o => {
        //console.log("friend", o)
        friendsShows.push(JSON.parse(o));
        combinedShows.push(JSON.parse(o));
      });
  
      user.approvedContentIMDBID.forEach(o => {
        //console.log("user", o)
        usersShows.push(JSON.parse(o));
        combinedShows.push(JSON.parse(o));
      });
         // console.log("combined shows", combinedShows)

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
      console.log('shows no dupes! ', showsNoDuplicatesNoEmpties.map((s) => s.title))
      return setFilteredData(showsNoDuplicatesNoEmpties);
      
    } else return;
  }
  }


  useEffect(() => {
    setIsLoading(true);
    fetchData();
    setFriend(state?.friend)
    filterMovieDataByFriend(movieData);
    sendMovieDataToCards(filteredData);
  }, [movieData]);

    function renderCards() {
        return moviesDataForCards.length > 0 ? (
          <MovieCards movies={moviesDataForCards} user={user} doNothingFlag={true}/>
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



    return ( <div>
      <div>hello</div>
        {renderCards()}
    </div> );
}

export default WatchMatchScreen;