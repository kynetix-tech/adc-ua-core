import { LinearProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { NavbarContainerWrapper } from './components/NavContainerWrapper';

const LazyLogin = lazy(() => import('./pages/IntroLogin'));

interface RoutesConfig {
  path: string;
  element: React.ReactElement;
  children?: RoutesConfig[];
}

export const paths = {
  root: {
    path: '/',
  },
  login: {
    path: 'login',
  },
};

const routes: RoutesConfig[] = [
  {
    path: paths.root.path,
    element: <NavbarContainerWrapper />,
    children: [{ path: paths.login.path, element: <LazyLogin /> }],
  },
];

const getRoutes = (routes: RoutesConfig[]) => {
  return routes.map(({ path, element, children }) => {
    const suspended = <Suspense fallback={<LinearProgress />}>{element}</Suspense>;
    return children ? (
      <Route key={path} path={path} element={suspended}>
        {getRoutes(children)}
      </Route>
    ) : (
      <Route key={path} path={path} element={suspended} />
    );
  });
};

export function AppRouter() {
  return <Routes>{getRoutes(routes)}</Routes>;
}
