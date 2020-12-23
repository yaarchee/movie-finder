import { Link } from 'react-router-dom';
import routes from '../../../routes';

const FilmItem = ({ title, id, location }) => {
  return (
    <li>
      <Link
        to={{
          pathname: `${routes.movies}/${id}`,
          state: { from: location },
        }}
      >
        {title}
      </Link>
    </li>
  );
};

export default FilmItem;
