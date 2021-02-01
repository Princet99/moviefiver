/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Header = () => {
  /* useState used to update the textfield on runtime of Seach Movie textfield */
  const [query, setquery] = useState("");
  /* useState used to update the list of movie add in resluts  */
  const [results, setresults] = useState([]);

  const input = (e) => {
    /* Prevent Default is a function to prevent the form from submission */
    e.preventDefault();
    /* e is a parameter Returns the object to which event is dispatched (its target). */
    setquery(e.target.value);
    fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1&include_adult=false&query=${e.target.value}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) setresults(data.results);
        else setresults([]);
      });
  };
  return (
    <div>
      <nav className="header">
        <ul className="topnav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <ul className="search">
            <form className="form-inline my-2 my-lg-0">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search"
                value={query}
                onChange={input}
              />
            </form>
          </ul>
        </ul>
      </nav>
      {/* Passing the update texfield value to search component */}
      {results.length > 0 && (
        <ul className="drop">
          {results.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={`${movie.title} Poster`}
                />
              </Link>
              {movie.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
