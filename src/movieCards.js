import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { Auth, DataStore } from "aws-amplify";
import "./MovieCards.css";
import { User } from "./models";


function MovieCards(props) {
  const user = props.user;

  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [currentMovie, setCurrentMovie] = React.useState();


  const onSwipe = (direction) => {
    //console.log('You swiped: ' + direction)
    if (direction == 'left'){
      //save(currentMovie, false);
    } else if (direction == 'right'){
      //save(currentMovie, true);
    }
  }
  
  const onCardLeftScreen = (myIdentifier) => {

    setCurrentIndex(prevIndex => (currentIndex + 1))
    console.log('movies length?', movies.length)
    setMovies(prevMovies => ([...prevMovies, ...props.movies.slice(currentIndex, currentIndex+1)]));
  }
  useEffect(() => {
    setMovies(props.movies.slice(1, 10))
  }, [props.movies])

  useEffect(() => {
    console.log('movies', movies) 
  }, [movies]);

  const save = async (newIMDBID, approved) => {
    const updateUser = User.copyOf(user, (updated) => {
      if (approved == true) {
        if (updated.approvedContentIMDBID == null) {
          updated.approvedContentIMDBID = newIMDBID;
        } else {
          updated.approvedContentIMDBID = newIMDBID;
        }
      } else {
        if (updated.unapprovedContentIMDBID == null) {
          updated.unapprovedContentIMDBID = newIMDBID;
        } else {
          updated.unapprovedContentIMDBID = newIMDBID;
        }
      }
    });
    await DataStore.save(updateUser);
  };

  return (
    <div className="card_container">
      {movies.map((movies, index) => (
        <TinderCard
          className="swipe"
          key={movies.index}
          preventSwipe={["up", "down"]}
          onSwipe={onSwipe}
          onCardLeftScreen={onCardLeftScreen}
        >
          <div className="card" key={movies.backdropPath}>
            <h3>{movies.title}</h3>
            <iframe
              key={movies.video}
              className="trailer"
              width="425"
              height="240"
              src={`https://www.youtube.com/embed/${movies.video}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Embedded youtube"
            />
            <p>{movies.overview}</p>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}

export default MovieCards;
