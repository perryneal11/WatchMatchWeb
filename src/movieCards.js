import React, { useState } from "react";
import TinderCard from "react-tinder-card";
import './MovieCards.css'

function MovieCards(props) {
  const [movies, setMovies] = useState([
    {
      name: "avengers",
      url: "https://terrigen-cdn-dev.marvel.com/content/prod/1x/avengersendgame_lob_crd_05.jpg",
    },
    {
      name: "harrypotter",
      url: "https://m.media-amazon.com/images/M/MV5BMGVmMWNiMDktYjQ0Mi00MWIxLTk0N2UtN2ZlYTdkN2IzNDNlXkEyXkFqcGdeQXVyODE5NzE3OTE@._V1_.jpg",
    },
    {
      name: "lord of the rings",
      url: "https://media.vanityfair.com/photos/5d3c8ea8d61bba0008c98b70/master/pass/amazon-lord-of-the-rings-creative.jpg",
    },
  ]);

  return (
      <div className="card_container">
      {movies.map((movie) => (
        <TinderCard className="swipe" key={movies.name} preventSwipe={["up", "down"]}>
          <div 
          style={{ backgroundImage: `url(${movie.url})` }} 
          className="card">
              <h3>{movie.name}</h3>
          </div>
        </TinderCard>
      ))}
    </div>
  );
  
}

export default MovieCards;
