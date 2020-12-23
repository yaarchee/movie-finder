import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import routes from '../../routes';
import styles from './Navigation.module.css';

const NavigationInMovie = ({ location }) => {
  const match = useRouteMatch();

  return (
    <>
      <NavLink
        // to={`${match.url}/cast`}
        to={{
          pathname: `${match.url}/cast`,
          state: { from: location },
        }}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
      >
        Cast
      </NavLink>
      <NavLink
        // to={`${match.url}/review`}
        to={{
          pathname: `${match.url}/review`,
          state: { from: location },
        }}
        className={styles.navLink}
        activeClassName={styles.navLinkActive}
      >
        Review
      </NavLink>
    </>
  );
};

export default NavigationInMovie;
