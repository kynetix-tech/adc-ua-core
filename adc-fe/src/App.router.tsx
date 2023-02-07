import React, { lazy } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { NavbarContainerWrapper } from './components/NavContainerWrapper';

const LazyLogin = lazy(() => import('./pages/Login'));

interface RoutesConfig {
  path: string;
  element: React.ReactElement;
  children?: RoutesConfig[];
}

export const paths = {
  login: {
    path: 'login',
  },
};

const routes: RoutesConfig[] = [
  {
    path: paths.login.path,
    element: <NavbarContainerWrapper />,
    children: [{ path: paths.login.path, element: <LazyLogin /> }],
  },
];

const getRoutes = (routes: RoutesConfig[]) => {
  return routes.map(({ path, element, children }) =>
    children ? (
      <Route key={path} path={path} element={element}>
        {getRoutes(children)}
      </Route>
    ) : (
      <Route key={path} path={path} element={element} />
    ),
  );
};

export function AppRouter() {
  return <Routes>{getRoutes(routes)}</Routes>;
}
