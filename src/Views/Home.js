import makeFetch from '../Services/makeFetch';
import FilmList from '../components/FilmList/FilmList';
import React, { useState, useEffect } from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';
import spinnerStyle from '../Services/spinnerStyle';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    makeFetch.getPopular().then((res) => {
      setIsLoad((prevState) => !prevState);
      setMovies(res);
    });
  }, []);

  return (
    <>
      {isLoad && <LinearProgress style={{ ...spinnerStyle }} />}
      {movies.length > 0 && <FilmList movies={movies} />}
    </>
  );
}
