import React, { useState, useEffect, Suspense } from 'react';
import {
  Route,
  Switch,
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from 'react-router-dom';
import makeFetch from '../Services/makeFetch';
import style from './MoviesDetails.module.css';
import Cast from './Cast';
import routes from '../routes';
import Review from './Review';
import noImage from '../img/noImageCard.jpg';
import LinearProgress from '@material-ui/core/LinearProgress';
import spinnerStyle from '../Services/spinnerStyle';
import NavigationInMovie from '../components/Navigation/NavigationInMovie';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const [isLoad, setLoad] = useState(true);
  const match = useRouteMatch();
  const { movieID } = useParams();
  const history = useHistory();
  const location = useLocation();

  useEffect(async () => {
    if (!movieID) {
      return;
    }

    try {
      const movieRes = await makeFetch
        .getFetchForID(movieID)
        .then((res) => res);
      const rev = await makeFetch.getReviewForID(movieID).then((res) => res);
      const cast = await makeFetch.getCastForID(movieID).then((res) => res);

      movieRes.review = [...rev];
      movieRes.cast = [...cast];
      setMovie(movieRes);
      setLoad(!isLoad);
    } catch (e) {
      console.log(e);
    }
  }, []);

  const goPrevBlank = () => {
    if (location.state && location.state.from) {
      history.push({
        ...location.state.from,
      });
      return;
    }
    history.push(routes.movies);
  };

  return (
    <>
      {isLoad && <LinearProgress style={{ ...spinnerStyle }} />}
      {movie && (
        <div className={style.movieWrap}>
          <button onClick={goPrevBlank}>go back</button>
          <h2>{movie.title}</h2>

          <div className={style.moviesDescWrap}>
            <img
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w400${movie.backdrop_path}`
                  : noImage
              }
              alt={movie.title}
            />
            <div className={style.movieDesc}>
              <p>
                <span>Vote:</span> {movie.vote_average}
              </p>
              <p>
                <span>Overview:</span> {movie.overview}
              </p>
              <div className={style.genres}>
                <span>Genres:</span>
                {movie.genres.map((genre) => (
                  <p key={genre.name}>{genre.name}</p>
                ))}
              </div>
            </div>
          </div>

          <NavigationInMovie location={location} />

          <Suspense fallback={<LinearProgress style={{ ...spinnerStyle }} />}>
            <Switch>
              <Route path={`${match.path}/cast`}>
                <Cast cast={movie.cast} />
              </Route>

              <Route path={`${match.path}/review`}>
                <Review rev={movie.review} />
              </Route>
            </Switch>
          </Suspense>
        </div>
      )}
    </>
  );
};
export default MovieDetails;
