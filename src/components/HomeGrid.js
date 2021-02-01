import React, { useState } from "react";
import { Link } from "react-router-dom";

export const HomeGrid = ({ id, title, poster_path }) => {
  const [read, setread] = useState(false);
  return (
    <div
      className="col-lg-2 col-md-3 col-sm-3 col-xs-6"
      style={{ padding: 20 }}
    >
      <div className="poster">
        <div className="header">
          <Link to={`/movie/${id}`}>
            <img
              src={`https://image.tmdb.org/t/p/w200/${poster_path}`}
              alt={`${title} Poster`}
            />
          </Link>
        </div>
        <div
          className="body"
          onMouseEnter={() => setread(true)}
          onMouseLeave={() => setread(false)}
        >
          {read ? title : `${title.substring(0, 18)}`}
        </div>
      </div>
    </div>
  );
};

export default HomeGrid;
