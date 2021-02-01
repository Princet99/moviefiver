/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useState, useEffect } from "react";

export const Movie = (props) => {
  const [id, setid] = useState(props.match.params.id);
  const [results, setresults] = useState([]);
  const [review, setreview] = useState([]);
  const [details, setDetails] = useState([]);
  const [videos, setVideos] = useState([]);
  // const [similar, setsimilar] = useState([]);
  //Movie Details Call
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&adult=true`
    )
      .then((res) => res.json())
      .then((data) => {
        setresults(data);
      })
      .catch((err) => {
        throw err;
      });
  }, [id]);
  //Movie Review Call
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${process.env.REACT_APP_TMBD_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setreview(data.results);
      })
      .catch((err) => {
        throw err;
      });
  }, [id]);
  //Movie Details Call
  useEffect(() => {
    fetch(`http://www.omdbapi.com/?apikey=b14679c7&i=${results.imdb_id}`)
      .then((res) => res.json())
      .then((data) => {
        setDetails(data);
      })
      .catch((err) => {
        throw err;
      });
  }, [results.imdb_id]);
  //Trailer Details call
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US
    `)
      .then((res) => res.json())
      .then((data) => {
        setVideos(data.results[0].key);
      })
      .catch((err) => {
        throw err;
      });
  }, [id]);
  //Similar Movies Details
  // useEffect(() => {
  //   fetch(`https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.REACT_APP_TMBD_KEY}&language=en-US&page=1
  //   `)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setsimilar(data.results);
  //     })
  //     .catch((err) => {
  //       throw err;
  //     });
  // }, [id]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-12">
          <h1 id="movie_title">{results.title}</h1>
        </div>
      </div>
      <div className="row" id="poster_row">
        <div>
          <img
            className="image-fluid post"
            src={`https://image.tmdb.org/t/p/w200/${results.poster_path}`}
            alt={`${results.title} Poster`}
          />
        </div>
      </div>

      <div className="col-lg-12">
        <div className="Details">
          <h3>{results.release_date}</h3>
          <h3>Overview</h3>
          <h4>{results.overview}</h4>
          {/* Director names */}

          <div className="row">
            <div className="col-lg-4">
              <h3>Director</h3>
              <h4 id="act">{details.Director}</h4>
            </div>
            <div className="col-lg-4">
              <h3>Writer</h3>
              <h4 id="act">{details.Writer}</h4>
            </div>
            <div className="col-lg-4">
              <h3>Actors</h3>
              <h4 id="act">{details.Actors}</h4>
            </div>
          </div>
        </div>
        {/* Trailer Link */}
        <div className="row gallery" id="video_row">
          <div className="col-lg-12">
            <object id="video" data={`https://www.youtube.com/embed/${videos}`}>
              v
            </object>
          </div>
        </div>
        {/* Details */}
        <div class="row">
          <div class="col-lg-12">
            <h3>Details</h3>
          </div>
        </div>
        <div class="row">
          <table class="table table-striped text-center">
            <tbody>
              <tr>
                <td>Country</td>
                <td>{details.Country}</td>
              </tr>
              <tr>
                <td>Language</td>
                <td>{details.Language}</td>
              </tr>
              <tr>
                <td>Production</td>
                <td>{details.Production}</td>
              </tr>
              <tr>
                <td>BoxOffice</td>
                <td>{details.BoxOffice}</td>
              </tr>
              <tr>
                <td>Released</td>
                <td>{details.Released}</td>
              </tr>
              <tr>
                <td>Runtime</td>
                <td>{details.Runtime}</td>
              </tr>
              <tr>
                <td>Website</td>
                <td>
                  <a target="blank">{details.Website}</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* Reveiew */}
      <h3>Review</h3>
      {review.length > 0 &&
        review.map((rev) => {
          return (
            <div>
              <div className="pallet">
                <p id="review_content">{rev.content}</p>
                <small id="author_name">{rev.author}</small>
              </div>
            </div>
          );
        })}
      {/* Similar Movie */}

      <br />
      <br />
      <i className="fab fa-imdb icon_imdb"></i>
      {/* {similar.length > 0 &&
        similar.map((sim) => {
          return (
            <div
              className="col-lg-2 col-md-3 col-sm-3 col-xs-6"
              style={{ padding: 20 }}
            >
              <div className="poster">
                <div className="header">
                  <Link to={`/movie/${id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w200/${sim.poster_path}`}
                      alt={`${sim.title} Poster`}
                    />
                  </Link>
                </div>
              </div>
            </div>
          );
        })} */}
    </div>
  );
};
