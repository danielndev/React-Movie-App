import React, {useState, useEffect} from 'react';
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

  useEffect(() => {
    console.log("Search: " + search);
    if(search === ""){
      //getData(tabs[0].API_URL);
    }else{
      getData("https://api.themoviedb.org/3/search/movie?&api_key="+API_KEY+"&query="+search);
    }
  }, [query]);

  var changeSearch = e => {
    setSearch(e.target.value);
  }

  var submitSearch = () => {
    setQuery(search);
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
      <h1>Working</h1>
    );
  }
  return (
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
          />
          ))}
      </div>
    </div>
  );
}




export default App;
