import React, { useState, useEffect } from 'react';
import makeFetch from '../Services/makeFetch';
import FilmList from '../components/FilmList/FilmList';
import SearchForm from '../components/SearchForm/SerachForm';
import getParseQuery from '../Services/parseQuery';
import LinearProgress from '@material-ui/core/LinearProgress';
import spinnerStyle from '../Services/spinnerStyle';
import { useHistory, useLocation } from 'react-router-dom';

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const location = useLocation();
  const history = useHistory();

  console.log(getParseQuery(useLocation().search));

  useEffect(() => {
    const { query } = getParseQuery(location.search);
    if (!query) {
      return;
    }
    setIsLoad(!isLoad);
    makeFetch
      .getMovies(query)
      .then((res) => {
        setIsLoad((prevState) => !prevState);
        setMovies(res);
      })
      .catch(console.log);
  }, [location]);

  const handleSubmitForm = (query) => {
    if (!query) {
      return;
    }
    history.push({
      ...location,
      search: `query=${query}`,
    });
  };

  return (
    <>
      <SearchForm onSubmit={handleSubmitForm} />
      {isLoad && <LinearProgress style={{ ...spinnerStyle }} />}
      {movies.length > 0 && <FilmList movies={movies} />}
    </>
  );
}
