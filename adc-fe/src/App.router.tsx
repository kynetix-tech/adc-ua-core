import { useAuth0 } from '@auth0/auth0-react';
import { LinearProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { NavbarContainerWrapper } from './components/NavContainerWrapper';
import { useApiTokenResolver } from './hooks/aunthefication/useApiTokenResolver';

const LazyLogin = lazy(() => import('./pages/IntroLogin'));
const LazyHome = lazy(() => import('./pages/Home'));

enum PermissionType {
  authenticatedOnly,
  guestOnly,
}

interface RoutesConfig {
  path: string;
  element: React.ReactElement;
  permission?: PermissionType;
  children?: RoutesConfig[];
}

export const paths = {
  root: '',
  login: 'login',
};

const routes: RoutesConfig[] = [
  {
    path: paths.login,
    element: <NavbarContainerWrapper />,
    children: [{ path: paths.root, element: <LazyLogin /> }],
  },
  {
    path: paths.root,
    element: <NavbarContainerWrapper />,
    permission: PermissionType.authenticatedOnly,
    children: [{ path: paths.root, element: <LazyHome /> }],
  },
];

const getRoutes = (routes: RoutesConfig[], isAuthenticated: boolean) => {
  return routes
    .filter(({ permission }) => {
      if (permission === PermissionType.guestOnly) return !isAuthenticated;
      if (permission === PermissionType.authenticatedOnly) return isAuthenticated;
      if (!permission) return true;
    })
    .map(({ path, element, children }) => {
      const suspended = <Suspense fallback={<LinearProgress />}>{element}</Suspense>;
      return children ? (
        <Route key={path} path={path} element={suspended}>
          {getRoutes(children, isAuthenticated)}
        </Route>
      ) : (
        <Route key={path} path={path} element={suspended} />
      );
    });
};

const getDefaultPathByPermission = (isAuthenticated: boolean) => {
  return isAuthenticated ? paths.root : paths.login;
};

export function AppRouter() {
  useApiTokenResolver();
  const { isAuthenticated } = useAuth0();

  return (
    <Routes>
      {getRoutes(routes, isAuthenticated)}
      <Route
        path={'*'}
        element={<Navigate to={getDefaultPathByPermission(isAuthenticated)} />}
      />
    </Routes>
  );
}
