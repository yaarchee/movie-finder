import React, { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from '../../routes';
import Navigation from '../Navigation/Navigation';
import LinearProgress from '@material-ui/core/LinearProgress';
import spinnerStyle from '../../Services/spinnerStyle';

const Home = lazy(() =>
  import('../../Views/Home.js' /*webpackChunkName: "Home"*/)
);
const Movies = lazy(() =>
  import('../../Views/Movies.js' /*webpackChunkName: "Movies"*/)
);

const NotFound = lazy(() =>
  import('../../Views/NotFound.js' /*webpackChunkName: "NotFound"*/)
);

const MovieDetails = lazy(() =>
  import('../../Views/MovieDetails.js' /*webpackChunkName: "MovieDetails"*/)
);

export default function App() {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <Suspense fallback={<LinearProgress style={{ ...spinnerStyle }} />}>
        <Switch>
          <Route path={routes.home} exact>
            <Home />
          </Route>
          <Route path={routes.movies} exact>
            <Movies />
          </Route>
          <Route path={routes.moviesID}>
            <MovieDetails />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </Suspense>
    </>
  );
}
