import { Outlet } from 'react-router';

import NavHeader from '../NavHeader';

export function NavbarContainerWrapper() {
  return (
    <>
      <NavHeader />
      <Outlet />
    </>
  );
}
