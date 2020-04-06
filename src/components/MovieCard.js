import React from 'react';
import './MovieCard.css';

var MovieCard = ({
    image, 
    title,
    description,
    release 
}) => {
    return(
        <div className="MovieCard">
            <img className="Movie-poster" src={"https://image.tmdb.org/t/p/w500/" + image} alt="" width="200"></img>
            <h1 className="Movie-title">{title}</h1>
         
            <p className="Movie-release">{release}</p>
        </div>
    );
}

export default MovieCard;