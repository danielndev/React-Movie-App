import React from 'react';
import './MovieCard.css';
import {
    Link
  } from "react-router-dom";
var MovieCard = ({
    image, 
    title,
    description,
    release,
    setMovie
}) => {
    return(
        <Link to="/movie_app/info" onClick = {setMovie} style={{textDecoration:"none"}}>
            <div className="MovieCard" >
                <img className="Movie-poster" src={"https://image.tmdb.org/t/p/w500/" + image} alt="" width="200"></img>
                <h1 className="Movie-title">{title}</h1>
            
                <p className="Movie-release">{release}</p>
            </div>
        </Link>
    );
}

export default MovieCard;