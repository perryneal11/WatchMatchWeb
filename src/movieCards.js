import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { Auth, DataStore } from "aws-amplify";
import "./MovieCards.css";
import { SwipeDown } from "@mui/icons-material";

function MovieCards(props) {
  const user = props.user;
  const doNothingFlag = props.doNothingFlag;
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [currentMovie, setCurrentMovie] = React.useState();

  const swipe = (direction, movie) => {
    console.log("help", doNothingFlag);
    if (doNothingFlag == false) {
      if (direction == "left") {
        // save(movie, false);
      } else if (direction == "right") {
        // save(movie, true);
      } else if (doNothingFlag == true) {
        console.log("we doing nothing", doNothingFlag);
      }
    }
  };

  const onCardLeftScreen = (myIdentifier) => {
    if (currentIndex == 0) {
      setCurrentIndex((prevIndex) => prevIndex + 4);
      //console.log('hit')
    } else {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    setMovies((prevMovies) => [prevMovies.pop()]);
    setMovies((prevMovies) => [
      ...prevMovies,
      ...props.movies.slice(currentIndex, currentIndex + 2),
    ]);
  };
  useEffect(() => {
    setMovies(props.movies.slice(currentIndex, currentIndex + 4));
  }, [props.movies]);

  useEffect(() => {
    //console.log('movies', movies.map(m => m?.title))
    //console.log(movies[1])
  }, [movies]);

  function renderCards() {
    if (movies.length > 0) {

      
      return movies.reverse().map((movies, index) => (
       
        <TinderCard
          className="swipe"
          key={movies.imdbID}
          preventSwipe={["up", "down"]}
          onSwipe={(dir) => swipe(dir, movies)}
          onCardLeftScreen={onCardLeftScreen}
        >
          <div className="card">
            <h3>
              {movies.title}
            </h3>
            <iframe
              className="trailer"
              width="500px"
              src={`https://www.youtube.com/embed/${movies.video}?autoplay=${
                (index == 3 && currentIndex == 0) ||
                (index == 2 && currentIndex >= 4)
                  ? 1
                  : 0
              }`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <p>{movies.overview}</p>
          </div>
        </TinderCard>
      
      ));
    } else {
      return <div>No mo mobies</div>;
    }
  }

  const save = async (newIMDBID, approved) => {

  };

  return <div className="card_root">{renderCards()}</div>;
}

export default MovieCards;
