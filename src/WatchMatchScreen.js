import React, { useEffect, useState, useCallback } from "react";
import MovieCards from "./movieCards";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";



function WatchMatchScreen(props) {

    const friend = props.friend
    console.log(friend)
    const user = props.user
    console.log(user)

    console.log(props)
    const [movieData, setMovieData] = React.useState([]);
    const [moviesDataForCards, setMovieDataForCards] = React.useState([]);
    const [filteredData, setFilteredData] = React.useState([]);
    const [isLoading, setIsLoading] = useState(true);


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



    return ( <div>
        {renderCards()}
    </div> );
}

export default WatchMatchScreen;