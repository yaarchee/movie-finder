import { useLocation } from 'react-router-dom';
import FilmItem from './FilmItem/FilmItem';
export default function FilmList({ movies }) {
  const location = useLocation();

  return (
    <ul>
      {movies.map(({ id, title }) => {
        return <FilmItem key={id} title={title} id={id} location={location} />;
      })}
    </ul>
  );
}
