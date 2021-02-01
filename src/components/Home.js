/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect } from "react";
import HomeGrid from "./HomeGrid";

export const Home = () => {
  const [results, setresults] = useState([]);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1
  `)
      .then((res) => res.json())
      .then((data) => {
        if (!data.errors) setresults(data.results);
        else setresults([]);
      });
  }, []);
  return (
    <div>
      <h2>Now Playing</h2>
      <div className="movie-container">
        {results.length > 0 &&
          results.map((movie) => <HomeGrid key={movie.id} {...movie} />)}
      </div>
    </div>
  );
};
