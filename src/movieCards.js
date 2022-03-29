import React, { useEffect, useState } from "react";
import TinderCard from "react-tinder-card";
import { Auth, DataStore } from "aws-amplify";
import "./MovieCards.css";
import { User } from "./models";


function MovieCards(props) {
  const user = props.user;

  const [movies, setMovies] = useState(props.movies);
  const [currentMovie, setCurrentMovie] = React.useState();


  const onSwipe = (direction) => {
    //console.log('You swiped: ' + direction)
    if (direction == 'left'){
      save(currentMovie, false);
    } else if (direction == 'right'){
      save(currentMovie, true);
    }
  }
  
  const onCardLeftScreen = (myIdentifier) => {
    console.log(myIdentifier + ' left the screen')
  }
  useEffect(() => {
    setMovies(props.movies)
  }, [props.movies])

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
      {console.log(props.movies)}
      {movies.map((movies) => (
        <TinderCard
          className="swipe"
          key={movies}
          preventSwipe={["up", "down"]}
          onSwipe={onSwipe}
        >
          <div className="card" key={movies.backdropPath}>
            <h3 key={movies.title}>{movies.title}</h3>
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
            <p key = {movies.id}>{movies.overview}</p>
          </div>
        </TinderCard>
      ))}
    </div>
  );
}

export default MovieCards;
