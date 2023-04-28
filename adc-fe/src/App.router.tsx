import { useAuth0 } from '@auth0/auth0-react';
import { LinearProgress } from '@mui/material';
import React, { lazy, Suspense } from 'react';
import { Navigate, Route } from 'react-router';
import { Routes } from 'react-router-dom';

import { NavbarContainerWrapper } from './components/NavContainerWrapper';
import { useApiTokenResolver } from './hooks/aunthefication/useApiTokenResolver';

const LazyLogin = lazy(() => import('./pages/IntroLogin'));
const LazyHome = lazy(() => import('./pages/PostList'));
const LazyCreatePost = lazy(() => import('./pages/PostCreateEdit'));
const LazyEditPost = lazy(() => import('./pages/PostEditWrapper'));
const LazyPostView = lazy(() => import('./pages/PostView'));

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
  any: '*',
  default: '/',
  root: '',
  login: 'login',
  post: {
    root: 'post',
    new: 'new',
    edit: { root: 'edit', param: 'postId' },
    view: { root: 'view', param: 'postId' },
  },
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
  {
    path: paths.post.root,
    element: <NavbarContainerWrapper />,
    children: [
      { path: paths.post.new, element: <LazyCreatePost /> },
      {
        path: `${paths.post.view.root}/:${paths.post.view.param}`,
        element: <LazyPostView />,
      },
      {
        path: `${paths.post.edit.root}/:${paths.post.edit.param}`,
        element: <LazyEditPost />,
      },
    ],
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
