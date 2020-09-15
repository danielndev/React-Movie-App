import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import './App.css';
import MovieCard from './components/MovieCard.js';
import ironManPic from './resources/Iron_man.png';

require('dotenv').config();
const API_KEY = process.env.REACT_APP_API_KEY;


const App = () => {

  var tabs = [
    {
      heading: "Most Popular",
      API_URL: "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key="+API_KEY
    },
    {
      heading: "Highest Voted",
      API_URL: "https://api.themoviedb.org/3/discover/movie?sort_by=vote_count.desc&api_key="+API_KEY
    }
  ];

  var genres = [
    {
      genre: "Comedy"
    }
  ]

  const [movies, setMovies] = useState([]); 
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  let movieSearch = "";
  const [chosenMovie, setChosenMovie] = useState({
    title: "",
    overview: "",
    release_date: "",
    backdrop_path: ""
  });
  
 
  useEffect(() => {
    console.log("Search: " + query);
    if(query === ""){
      //getData(tabs[0].API_URL);
    }else{
      getData("https://api.themoviedb.org/3/search/movie?&api_key="+API_KEY+"&query="+query);
    }
  }, [query]);

  var changeSearch = e => {
    movieSearch = e.target.value;
   
    //setSearch(e.target.value);
  }

  var submitSearch = () => {
    setQuery(movieSearch);
  }

  async function getData(url){

    var response = await fetch(url);
    var data = await response.json()
    
    var results = data.results;
    for(var i = results.length-1; i >= 0; i--){
      
      if(typeof(results[i].poster_path) != typeof(" ")){
        console.log(results[i].poster_path);
        results.pop(i);
      }
    }

    setMovies(results);
    console.log(results);
  }

  const LandingPage = () => {
    return(
    <div className="landing-page">
      <div className="background-circle circle1"></div>  
      <div className="background-circle circle2"></div>  
      <div className="background-circle circle3"></div>  
      <img className="iron-man" src={ironManPic}></img>
      <div className="title">
        <h1>Browse your favourite movies</h1>
        <h2>Discover your next watch</h2>
      </div>
    </div>
    );
  }

  const MoviePage = () => {
    return(
      <div className="App">
        <LandingPage></LandingPage>
        <div id="Navbar">
          <div className="search-container">
            <input className="search-bar" onChange={changeSearch} onSubmit={submitSearch} id="search-bar" placeholder="Search"></input>
            <a href="#Navbar">    
              <button className="submit-search" onClick={submitSearch}>▷</button>
            </a>
          </div>
          <div className="buttons">
            <a href="#Navbar">
              <h1 onClick={()=>{getData(tabs[0].API_URL)}}>{tabs[0].heading}</h1>
            </a>
            <a href="#Navbar">  
              <h1 onClick={()=>{getData(tabs[1].API_URL)}}>{tabs[1].heading}</h1>
            </a>  
          </div>
        </div>
        <div id="Movies-container">
          {movies.map(movie => (
            
            <MovieCard 
            key = {movie.id}
            image = {movie.poster_path}
            title = {movie.title}
            description = {movie.overview}
            release = {movie.release_date}
            setMovie = {() => setCurrentMovie(movie)}
            />
            
            ))}

        </div>
      </div>
    );
  }

  let setCurrentMovie = (m) => {
    setChosenMovie(m);
    console.log(m.title);
    
  }

  

  const MovieInfo = (
    {title,
    backdrop,
    overview,
    release_date}
  ) => {
    console.log(backdrop)
    return(
      <div>
        <img className="Movie-poster" src={"https://image.tmdb.org/t/p/w1280/" + backdrop} alt="" style={{width: "100%", position: "fixed", zIndex:"0"}}></img>
        <div style={{width:"100%", height: "50%", backgroundColor: "rgba(0,0,20,0.9)", position:"absolute", top: "50%", color:"white"}}>
          <Link to="/movie_app" style={{color:"white",textDecoration:"none"}}><h3 style={{margin: "20px", fontSize:"1rem"}}>Back</h3></Link>
          <h1 style={{margin: "20px", fontSize:"2rem"}}>{title}</h1>
          <p style={{margin: "20px", fontSize:"1rem"}}>{overview}</p>
          <p style={{margin: "40px", fontSize:"1rem"}}>Release Date: {release_date}</p>
          
        </div>
      </div>
    )
  }
  return (
      <Router>
      <Switch>
        <Route exact path="/movie_app">
          <MoviePage/>
        </Route>
        <Route path="/movie_app/info">
          <MovieInfo
            title = {chosenMovie.title}
            backdrop = {chosenMovie.backdrop_path}
            overview = {chosenMovie.overview}
            release_date = {chosenMovie.release_date}
          />
        </Route>   
      </Switch>
    </Router>
      
  );
}




export default App;
